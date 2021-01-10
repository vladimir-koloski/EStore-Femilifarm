import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token, User } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  serverUrl = environment.apiServer

  constructor(private http: HttpClient) { }

  register(body: any) : Observable<any> {
    let url = `${this.serverUrl}/api/User/register`;
    return this.http.post(url, body)
  }

  login(body: any) : Observable<any>{
    let url = `${this.serverUrl}/api/User/login`;
    return this.http.post<User>(url, body)
  }

  
}
