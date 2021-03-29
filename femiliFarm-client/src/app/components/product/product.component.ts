import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { CartRequestModel } from 'src/app/models/cart-model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: any;
  showMessage: boolean = false;

  isLogged: boolean = false;
  constructor(private authService: AuthService,
              private cartService: CartService){}

  ngOnInit(){
    this.authService.isLoggedIn.subscribe(isLogged =>{
      this.isLogged = isLogged
    })
  }

  updateCart(product){
    let userId = this.authService.getUserId()
    let request = new CartRequestModel();
    request = {
      userId: parseInt(userId),
      product: product
    }

    this.cartService.updateCart(request).subscribe({
      error: err => console.warn(err.error)
    })
    this.showMessage = true;    
  }
}
