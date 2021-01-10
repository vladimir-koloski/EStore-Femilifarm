import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product-model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productId: number
  product: Product

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService) { }

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
}
