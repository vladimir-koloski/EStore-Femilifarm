import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router,
              private authService: AuthService,
              private cartService: CartService) { }

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
        this.createEmptyCart()        
        this.router.navigateByUrl("/products")
      }
    })
  }

  createEmptyCart(){
    let userId = this.authService.getUserId()
    let request = {
      UserId: parseInt(userId),
      }
      console.log(request)

    this.cartService.createCart(request).subscribe({
      error: err => console.warn(err.error)
    })
  } 

  
}
