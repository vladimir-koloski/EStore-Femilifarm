import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductRequestModel } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {

  serverUrl = environment.apiServer
  constructor(private http: HttpClient) { }


  addProduct(request: ProductRequestModel) {
    let url = `${this.serverUrl}/api/Product/AddProduct`
    return this.http.post<ProductRequestModel>(url, request)
  }

  updateProduct(request: ProductRequestModel) : Observable<any>{
    let url = `${this.serverUrl}/api/Product/EditProduct`
    return this.http.post<ProductRequestModel>(url, request)
  }

  getAllProducts(filter: any){
    filter.category = filter.category === "" ? "" : parseInt(filter.category)
    let url = `${this.serverUrl}/api/Product/GetProducts?name=${filter.name}&category=${filter.category}`;
    return this.http.get(url);
  }

  deleteProduct(id: number){
    let url = `${this.serverUrl}/api/Product/DeleteProduct?id=${id}`
    return this.http.delete(url);
  }

  sellProduct(id: number) {
    let url = `${this.serverUrl}/api/Product/SellProduct?id=${id}`
    return this.http.get(url);
  }
}
