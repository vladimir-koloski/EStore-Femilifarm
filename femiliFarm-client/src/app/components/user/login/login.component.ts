import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject} from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Cart, CartRequestModel } from 'src/app/models/cart-model';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isCartEmpty = new BehaviorSubject<boolean>(true);
  cart: Cart
  isAdmin: boolean
  userId: number;

  constructor(private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private cartService: CartService) { }

  message: string = ""

  ngOnInit(): void {


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
        this.userId = res.id
      },
      error: err => {
        this.message = err.error
        this.formModel.reset()

      },
      complete: () => {

        this.authService.checkIfUserIsAdmin()
        this.authService.isAdmin.subscribe(isAdmin => {
          this.isAdmin = isAdmin
        })
        if (this.isAdmin) {
          this.router.navigateByUrl("/admin-panel")
        } else { this.router.navigateByUrl("/products") }
        this.getUserCart(this.userId)
        // this.authService.getUserId().pipe(
        //   tap((res: string) => {
        //     this.getUserCart(parseInt(res))
        //   })
        // )
        // .subscribe();      
        console.log(this.cart)
        console.log(this.isCartEmpty)
      }
    })
  }

  // getUserCart(){
  //   if(this.getLastUserCart()){
  //     this.cart = this.getLastUserCart();
  //   }else{
  //     this.createEmptyCart();      
  //   }
  // }

  createEmptyCart(userId: number) {
    let request = new CartRequestModel();
    request = {
      userId: userId,
    }
    this.cartService.createCart(request).pipe(
      filter((res: Cart) => !!res),
      tap((res: Cart) => {
        this.cart = res;
        console.log(res)
        this.isCartEmpty.next(true);
      })
    )
      .subscribe()
  }

  getUserCart(userId: number) {
    this.cartService.getUserCart(userId).pipe(
      tap((res: Cart) => {
        if (!!res) {
          console.log(res);
          this.cart = res;
          this.checkIfCartIsEmpty()
        } else {
          this.createEmptyCart(userId);
          console.log('testtt')
        }
      })
    ).subscribe()
  }


  checkIfCartIsEmpty() {
    console.log(this.cart.products.length)
    if (this.cart.products.length > 0) {
      this.isCartEmpty.next(false)
    } else {
      this.isCartEmpty.next(true)
    }
  }


  onLogout() {
    this.authService.logout()
    //this.getUserCart()
    //console.log(this.isCartEmpty)
  }


}
