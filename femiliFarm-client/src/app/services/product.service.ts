import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'
import { Product } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  serverUrl = environment.apiServer

  constructor(private http: HttpClient) { }

  getProducts() : Observable<Product[]>{
    let url = `${this.serverUrl}/api/Product/GetProducts`;
    return this.http.get<Product[]>(url);
  }

  getProductById(id: number) : Observable<Product> {
    let url = `${this.serverUrl}/api/Product/GetProductById?Id=${id}`;
    return this.http.get<Product>(url);
  }
}