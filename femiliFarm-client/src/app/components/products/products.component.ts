import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Cart } from 'src/app/models/cart-model';
import { Product } from 'src/app/models/product-model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  cart: Cart;
  //notifier = new Subject();

  constructor(private productService: ProductService,
    private authService: AuthService,
    private cartService: CartService) { }

  ngOnInit(): void {
    //this.getUserCart();
    this.getAllProducts();
    this.cartService.$products.subscribe(products => {
      this.cart.products = products;
    })
    // console.log(this.products);
        // let userId = this.authService.getUserId();
        // this.cartService.getUserCart(userId).pipe(takeUntil(this.notifier))
        // .subscribe(x => console.log(x));
  }
    
   ngOnDestroy(): void{
  //   this.cartService.$products.unsubscribe();
        // this.cartService.$products.next();
        // this.cartService.$products.complete();
   }

  getUserCart() {
    let userId = this.authService.getUserId();
    this.cartService.getUserCartProducts(userId);    
  }

  getAllProducts() {
    this.productService.getProducts().subscribe({
      next: data => this.products = data,
      error: err => console.warn(err.error)
    })
  }



}
