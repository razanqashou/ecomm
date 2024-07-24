import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../sevices/seller/product/product.service';
import { Icart, priceSummary } from '../../../interfaces/product';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {
  cartData:Icart[]|undefined
  cartData2:Icart|undefined
  priceSummary:priceSummary={
  price:0,
  discount:0,
  tax:0,
  delivery:0,
  total:0
  }
constructor(private product:ProductService,private route:Router) {}
  ngOnInit(): void {
  this.loadDetails()
  }
  removeToCart(cartId:string|undefined){
    cartId && this.cartData && this.product.removeToCart(cartId)
    .subscribe((result)=>{
      this.loadDetails();
    })
  }
  loadDetails(){
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * + item.quantity)
        }
      })
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
     
    
      if(this.priceSummary.price&&this.priceSummary.discount && this.priceSummary.tax!=0){
        this.priceSummary.delivery = 100;
        this.priceSummary.total = price + (price / 10) + 100 - (price / 10);

      }else{
        this.priceSummary.delivery = 0;
        if(!this.cartData.length){
          this.route.navigate(['/'])
        }

      }
  })}
}
