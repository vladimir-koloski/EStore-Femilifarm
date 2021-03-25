import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CartRequestModel } from 'src/app/models/cart-model';
import { Product } from 'src/app/models/product-model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-details', 
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productId: number
  product: Product
  showMessage: boolean = false

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private authService: AuthService,
              private cartService: CartService,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.productId = params.id    
    })
    this.getProductById()
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

  updateCart(product){
    let userId = this.authService.getUserId()
    let request = new CartRequestModel();
    request = {
      userId: parseInt(userId),
      product: product
    }

    this.cartService.updateCart(request).subscribe({
      error: err => console.warn(err.error)
    })
    this.showMessage = true;    
  }
  
}
