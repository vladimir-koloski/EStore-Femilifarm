import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: any;
  price: any

  constructor(private cartService: CartService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserCart();
  }

  getUserCart() {
    let userId = this.authService.getUserId()

    this.cartService.getUserCart(userId).subscribe({
      next: res => this.cart = res,
      error: err => console.warn(err.error),
      complete: () => {
        this.calculatePrice()
      }
    })
  }

  calculatePrice() {
    let price = 0;
    this.cart.products.forEach(product => {
      price += parseInt(product.price)
    });
    this.price = price
  }

}
