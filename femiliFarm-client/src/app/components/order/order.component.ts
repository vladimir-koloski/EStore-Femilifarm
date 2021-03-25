import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  
  @Input() order: any
  price: any
  
  constructor(private orderService: OrderService,
              private authService: AuthService) { }

 

  ngOnInit(): void {
    //let userId = this.authService.getUserId()
    //this.orders = this.orderService.getAllOrders()  
    this.calculatePrice();  
  }

  calculatePrice() {
    let price = 0;
    this.order.products.forEach(product => {
      price += parseInt(product.price)
    });
    this.price = price
  } 

}
