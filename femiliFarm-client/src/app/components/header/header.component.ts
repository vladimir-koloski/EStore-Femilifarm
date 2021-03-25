import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Cart } from 'src/app/models/cart-model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck, OnDestroy {

  isLoggedIn: boolean = false
  isUserAdmin: boolean = false
  isCartEmpty: boolean = true
  cart: Cart;

  constructor(private authService: AuthService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.getUserCart();
    this.cartService.$products.subscribe(products => {
      this.cart.products = products;
    })
    console.log('Header active')
  }

  ngDoCheck(): void {
    if (!!localStorage.getItem("token")) {
      this.authService.isLoggedIn.subscribe({
        next: data => this.isLoggedIn = data
      })

      this.authService.isAdmin.subscribe({
        next: data => this.isUserAdmin = data
      })

      this.authService.checkIfUserIsLogged()
      this.authService.checkIfUserIsAdmin()
    }
  }

  ngOnDestroy(): void {
    this.cartService.$products.unsubscribe();
    this.cartService.$cart.unsubscribe();
  }

  getUserCart() {
    let userId = this.authService.getUserId()

    this.cartService.getUserCart(userId).subscribe({
      next: res => this.cart = res,
      error: err => console.warn(err.error),
      complete: () => {
        this.checkIfCartIsEmpty()
      }
    })
  }

  checkIfCartIsEmpty() {
    return this.isCartEmpty = this.cart.products.length === 0;
  }

  onLogout() {
    this.authService.logout()
  }

}
