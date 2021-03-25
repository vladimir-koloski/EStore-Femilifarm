import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User, UserRequestModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  userId: number;
  isEditMode: boolean = false;
  message: string;
  modalRef: BsModalRef;
  
  requestForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    fullName: new FormControl('', Validators.required),
    passwords: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords})
  })

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers(){
    this.userService.getAll().subscribe({
      next: data => console.log(this.users = data),
      error: err => console.warn(err.error)
    })
  }

  deleteUser(id: number){
    this.userService.deleteUser(id).subscribe({
      error: err => console.warn(err.error),
      complete: () => {
        this.getAllUsers();
      }
    })
  }

  createUser(){
    let body = new UserRequestModel();
    body = {
      UserName : this.requestForm.value.userName,
      Email : this.requestForm.value.email,
      FullName : this.requestForm.value.fullName,
      Password : this.requestForm.value.passwords.password
    }    
    this.userService.register(body).subscribe({
      error: err => {
        this.message = err.error        
      },
      complete: () => {
        this.closeModal()
        this.getAllUsers()
      }
    })
  }

  editUser(){
    let body = new UserRequestModel();
    body = {
      UserName : this.requestForm.value.userName,
      Email : this.requestForm.value.email,
      FullName : this.requestForm.value.fullName,
      Password : this.requestForm.value.passwords.password,
      Id: this.userId
    }
    
    this.userService.updateUser(body).subscribe({
      error: err => console.warn(err.error),
      complete: () => { 
        this.closeModal()
        this.getAllUsers()
      }
    })
  }

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('confirmPassword');
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  openModal(template: TemplateRef<any>, user?: User) {
    this.modalRef = this.modalService.show(template);

      if(!!user){
        this.isEditMode = true;
        const {id, userName, fullName, password, email, ...rest} = user      
        this.requestForm.patchValue(user)
        this.userId = id        
      }     
    
  }

  closeModal(){
    this.modalService._hideModal()
    this.modalService._hideBackdrop()
    this.isEditMode = false;
    this.requestForm.reset()
  }

}
