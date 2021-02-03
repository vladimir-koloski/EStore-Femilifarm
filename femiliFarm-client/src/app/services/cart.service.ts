import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  serverUrl = environment.apiServer

  constructor(private http: HttpClient) { }

  createCart(request: any) : Observable<any>{
    let url = `${this.serverUrl}/api/Cart/CreateCart`;
    return this.http.post(url, request);
  }

  updateCart(request: any) : Observable<any>{
    let url = `${this.serverUrl}/api/Cart/UpdateCart`;
    return this.http.post(url, request);
  }

  removeProductFromCart(request: any) : Observable<any>{
    let url = `${this.serverUrl}/api/Cart/RemoveProductFromCart`;
    return this.http.post(url, request);
  }

  getUserCart(userId: number) : Observable<any>{
    let url = `${this.serverUrl}/api/Cart/GetCart?UserId=${userId}`;
    return this.http.get(url);
  }
}
