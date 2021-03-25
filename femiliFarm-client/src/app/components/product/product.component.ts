import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: any;

  isLogged: boolean = false;
  constructor(private authService: AuthService){}

  ngOnInit(){
    this.authService.isLoggedIn.subscribe(isLogged =>{
      this.isLogged = isLogged
    })
  }
}
