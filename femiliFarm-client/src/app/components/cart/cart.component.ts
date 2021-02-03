import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Product } from 'src/app/models/product-model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: any;
  price: any;
  productId: number;
  product: Product;

  constructor(private cartService: CartService,
              private productService: ProductService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUserCart();
    this.activatedRoute.params.subscribe((params: any) => {
      this.productId = params.id        
    })    
  }

  getProductById(){    
    this.productService.getProductById(this.productId).subscribe({
      next: data => this.product = data,
      error: err => console.warn(err.error),
      complete: () => {
        console.log('Product')        
      }
    })
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

  removeProduct(product){
    let userId = this.authService.getUserId()
    let request = {
      UserId: parseInt(userId),
      Product: product
    }    
    this.cartService.removeProductFromCart(request).subscribe({
      error: err => console.warn(err.error)
    })   
    this.getUserCart();   
  }

}
