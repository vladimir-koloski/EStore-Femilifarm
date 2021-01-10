import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router,
              private authService: AuthService) { }

  message: string = ""

  ngOnInit(): void {
    // if(localStorage.getItem("token") != null){
    //   this.router.navigateByUrl("/home")
    // }
  }

  formModel = new FormGroup({
    Username: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required)
  })

  onSubmit() {
    let body = {
      UserName: this.formModel.value.Username,
      Password: this.formModel.value.Password
    }

    this.userService.login(body).subscribe({
      next: res => {
        localStorage.setItem("token", res.token)
        console.log(res)
      },
      error: err => {
        this.message = err.error
        this.formModel.reset()
        
      },
      complete: () => {
        //this.createEmptyOrder()  
        
        this.router.navigateByUrl("/products")
      }
    })
  }

  createEmptyOrder(){
    let userId = this.authService.getUserId()
    let request = {
      UserId: userId
    }
  }


  
}
