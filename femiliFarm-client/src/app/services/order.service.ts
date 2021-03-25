import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order-model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  serverUrl = environment.apiServer;
  constructor(private http: HttpClient) { }

  createOrder(request: any) : Observable<any>{
    let url = `${this.serverUrl}/api/Order/CreateOrder`;
    return this.http.post(url, request);
  }

  getOrdersByUserId(id: number) : Observable<any>{
    let url = `${this.serverUrl}/api/Order/GetOrdersByUserId?id=${id}`;
    return this.http.get(url);
  }

  getOrderById(id: number) : Observable<any>{
    let url = `${this.serverUrl}/api/Order/GetOrderById?id=${id}`;
    return this.http.get(url);
  }

  getAllOrders() : Observable<Order[]>{
    let url = `${this.serverUrl}/api/Order/GetAllOrders`;
    return this.http.get<Order[]>(url);
  }

  

}
