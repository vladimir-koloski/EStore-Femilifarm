import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts(){
    this.productService.getProducts().subscribe({
      next: data => this.products = data,
      error: err => console.warn(err.error)
    })
  }

}
