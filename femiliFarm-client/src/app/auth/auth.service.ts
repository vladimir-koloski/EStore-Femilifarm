import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLoggedIn = new BehaviorSubject<boolean>(false)
  public isAdmin = new BehaviorSubject<boolean>(false)

  constructor(private router: Router) { }

   checkIfUserIsLogged(){
    if(localStorage.getItem("token") != null) {
      this.isLoggedIn.next(true)
    } else {
      this.isLoggedIn.next(false)
    }
   }

   checkIfUserIsAdmin(){
    if(this.isLoggedIn) {
      var payload = this.getPayload()
      var userRole = payload.role;

      if(userRole === "ADMIN") {
        this.isAdmin.next(true)
      } else {
        this.isAdmin.next(false)
      }
    }
   }

   getUsername(){
    if(this.isLoggedIn) {
      var payload = this.getPayload()      
      return payload.Username
    }
   }

   getUserId(){
    if(this.isLoggedIn) {
      var payload = this.getPayload()
      return payload.UserId
    }
   }

   logout(){
    this.isLoggedIn.next(false);
    this.isAdmin.next(false);
    localStorage.removeItem("token")
    this.router.navigate(["/user/login"])
   }

   roleMatch(allowedRols: any){
    var isMatch = false;
    var payload = this.getPayload()
    var userRole = payload.role

    allowedRols.forEach(role => {
      if(userRole == role){
        isMatch = true
      }
    })
    return isMatch
  }

   getPayload() {
    return JSON.parse(window.atob(localStorage.getItem("token").split('.')[1]))
  }
}
