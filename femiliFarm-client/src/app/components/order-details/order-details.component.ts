import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderId: number;
  order: any;
  constructor(private orderService: OrderService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.orderId = params.id    
    })
    this.getOrderById()
  }

  getOrderById(){    
    this.orderService.getOrderById(this.orderId).subscribe({
      next: data => this.order = data,
      error: err => console.warn(err.error),
      complete: () => {
            
      }
    })
  }

}
