import { Component, OnInit } from '@angular/core';
import { Icart, order, priceSummary } from '../../../interfaces/product';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../sevices/seller/product/product.service';

@Component({
  selector: 'app-my-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-order.component.html',
  styleUrl: './my-order.component.css'
})
export class MyOrderComponent implements OnInit{
  orderData:order[]|undefined
  constructor(private product:ProductService){}
  ngOnInit(): void {
   this.getOrderList() 
   }
  getOrderList(){
    this.product.orderList().subscribe((result)=>{
      this.orderData=result;
    })
  }
  cancelOrder(orderId:number|undefined){
    orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
      if(result){
        this.getOrderList();
      }
    })
  }

}
