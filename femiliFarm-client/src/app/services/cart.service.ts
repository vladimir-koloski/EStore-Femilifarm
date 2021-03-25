import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart, CartRequestModel } from '../models/cart-model';
import { Product } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  products: Product[] = [];
  $products = new Subject<Product[]>();
  cart: Cart;
  $cart = new Subject<Cart>();

  serverUrl = environment.apiServer

  constructor(private http: HttpClient) { }

  createCart(request: CartRequestModel): Observable<CartRequestModel> {
    let url = `${this.serverUrl}/api/Cart/CreateCart`;
    return this.http.post<CartRequestModel>(url, request);
  }

  updateCart(request: CartRequestModel): Observable<CartRequestModel> {
    this.products = [...this.products, request.product];
    this.$products.next(this.products);
    let url = `${this.serverUrl}/api/Cart/UpdateCart`;
    return this.http.post<CartRequestModel>(url, request);
  }

  removeProductFromCart(request: any): Observable<any> {
    this.products.splice(this.products.lastIndexOf(request.Product.id), 1);
    this.$products.next(this.products);
    let url = `${this.serverUrl}/api/Cart/RemoveProductFromCart`;
    return this.http.post(url, request);
  }

  getUserCart(userId: number): Observable<Cart> {
    let url = `${this.serverUrl}/api/Cart/GetCart?UserId=${userId}`;
    return this.http.get<Cart>(url);
    this.$cart.next(this.cart);

  }

  getUserCartProducts(userId: number) {
    this.getUserCart(userId).subscribe({
      next: data => this.cart = data,
      error: err => console.warn(err.error),
      complete: () => {
        console.log('cart')
        this.$products.next(this.cart.products);
      }
    })
  }




}
