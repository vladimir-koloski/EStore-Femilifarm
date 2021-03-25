import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product-model';
import { User, UserLoginModel, UserRequestModel } from '../models/user-model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  products: Product[] = [];
  $products = new Subject<Product[]>();
  serverUrl = environment.apiServer

  constructor(private http: HttpClient) { }

  register(body: UserRequestModel): Observable<any> {
    let url = `${this.serverUrl}/api/User/register`;
    return this.http.post(url, body)
  }

  login(body: UserLoginModel): Observable<any> {
    let url = `${this.serverUrl}/api/User/login`;
    return this.http.post<User>(url, body)
  }

  getAll(): Observable<User[]> {
    let url = `${this.serverUrl}/api/User/GetAllUsers`;
    return this.http.get<User[]>(url);
  }

  deleteUser(id: number) {
    let url = `${this.serverUrl}/api/User/DeleteUser?Id=${id}`;
    return this.http.delete(url);
  }

  updateUser(body: UserRequestModel): Observable<any> {
    let url = `${this.serverUrl}/api/User/EditUser`;
    return this.http.post(url, body);
  }


}
