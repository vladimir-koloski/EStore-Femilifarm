import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  serverUrl = environment.apiServer

  constructor(private http: HttpClient) { }

  getProducts(){    
    let url = `${this.serverUrl}/api/Product/GetProducts`;
    return this.http.get(url);
  }

  getProductById(id: number) : Observable<any> {
    let url = `${this.serverUrl}/api/Product/GetProductById?Id=${id}`;
    return this.http.get(url);
  }
}