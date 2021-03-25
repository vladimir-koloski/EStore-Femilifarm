import { Component, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Product } from 'src/app/models/product-model';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Cart, CartRequestModel } from 'src/app/models/cart-model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  modalRef: BsModalRef;
  cart: Cart;
  price: any;
  productId: number;
  product: Product;
  
 
  constructor(private cartService: CartService,
              private productService: ProductService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private orderService: OrderService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getUserCart()
    this.activatedRoute.params.subscribe((params: any) => {
      this.productId = params.id     
    })
  } 

  openModal(template: TemplateRef<any>, cart) {
    this.modalRef = this.modalService.show(template);
    this.createOrder(cart);
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
      price += product.price
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

  createOrder(cart){
    let userId = this.authService.getUserId()
    let request = {
      UserId: parseInt(userId),
      cartId: this.cart.id,
      products: cart.products
    }
    console.log(request)
    console.log(cart)

    this.orderService.createOrder(request).subscribe({
      error: err => console.warn(err.error)
    })  
    this.createEmptyCart();
    this.cartService.getUserCartProducts(userId);
    this.router.navigateByUrl('/products');    
  }

  createEmptyCart(){
    let userId = this.authService.getUserId()
    let request = new CartRequestModel();
    request = {
      userId: parseInt(userId),
      }
      console.log(request)

    this.cartService.createCart(request).subscribe({
      error: err => console.warn(err.error)
    })
  } 

}
