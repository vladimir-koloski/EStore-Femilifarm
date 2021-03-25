import {concatMap, map, mergeMap, tap} from 'rxjs/operators'; 
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Order } from 'src/app/models/order-model';
import { OrderService } from 'src/app/services/order.service';
import { Product } from 'src/app/models/product-model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];
  order: Order
  price: any;
  constructor(private orderService: OrderService,
              private authService: AuthService) { }

  ngOnInit(): void {
    //this.getAllOrdersByUserId()  
    //this.getAllOrders()

    this.orderService.getAllOrders()
    .pipe(tap((res: Order[]) => {
      this.orders = res;     
      this.orders.map((order: Order) => {
        let totalPrice : number = 0;
        order.products.map((product: Product) => {
          totalPrice = totalPrice + product.price;
        })
        order.totalPrice = totalPrice;
      })
    }))
    .subscribe()
    
  }

  

  // getAllOrders(){    
  //   this.orderService.getAllOrders().subscribe({
  //     next: data => console.log(this.orders = data), 
  //     error: err => console.warn(err.error),
  //     complete: () => {        
  //     }
  //   });
  // }
  
  


  calculatePrice(orders) {
    let price = 0;
    orders.order.products.forEach(product => {
      price += parseInt(product.price)
       orders.order.totalPrice = price
    });
    return orders
    
  }   

  // getAllOrdersByUserId(){
  //   let userId = this.authService.getUserId()
  //   this.orderService.getOrdersByUserId(userId).subscribe({
  //     next: data => console.log(this.orders = data), 
  //     error: err => console.warn(err.error),
  //     complete: () => {
        
  //     }
  //   });

}
