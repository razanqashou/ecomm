import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Icart, Iproduct, order } from '../../../interfaces/product';
import { ProductService } from '../../sevices/seller/product/product.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  newSingUp: order = {} as order;

  cartData: Icart[] | undefined;
  orderMsg: string | undefined;
  keyup:boolean=false
  constructor(private product:ProductService ,private router:Router){}
  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {

      let price = 0;
       this.cartData = result;
      result.forEach((item) => {
        if (item.quantity ) {
          price = price + (+item.price * +item.quantity)
        }
      })
      if(price!=0){
      this.totalPrice = price + (price / 10) + 100 - (price / 10);}
      else{
        this.totalPrice=0
      }


    })
  }
keyUps(){
  this.keyup=true
}
  orderNow(data: { email: string, address: string, contact: number }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined
      }

      this.cartData?.forEach((item) => {
        console.log(item)
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id);
        }, 700)
      })

      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMsg = "Order has been placed";
          setTimeout(() => {
            this.orderMsg = undefined;
            this.router.navigate(['/my-order'])
          }, 900);

        }

      })
    }

  }
}