import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Icart, Iproduct } from '../../../interfaces/product';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../sevices/seller/product/product.service';
import { Ilogin, IsignUp } from '../../../interfaces/singup';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  productData:undefined|Iproduct;
  cartData:Iproduct|undefined;
  user:Ilogin | IsignUp | undefined
  @Input() productQuantity: number = 1; // Set default quantity if not provided

  @Output() quantityChange = new EventEmitter<number>();

  
  constructor(private activeRouter:ActivatedRoute, private product:ProductService){}
  ngOnInit(): void {
    let productId=this.activeRouter.snapshot.paramMap.get('productId');
    productId&&this.product.getProduct(productId).subscribe(res=>{
     this.productData=res 
    }) 

    
    
    let user = localStorage.getItem('user');
      if(user){
        let userId= user && JSON.parse(user).id;
        this.product.getCartList(userId);

        this.product.cartData.subscribe((result)=>{
          let item = result.filter((item:Iproduct)=>productId?.toString()===item.productId?.toString())
       if(item.length){
        this.cartData=item[0];
      }
        })
      }
  }
  
 
  handleQuantity(action: string) {
    switch (action) {
      case 'decrement':
        this.productQuantity = Math.max(0, this.productQuantity - 1);
        break;
      case 'increment':
        this.productQuantity++;
        break;
    }
    
    this.quantityChange.emit(this.productQuantity);
  }

  addProduct(){
    if(this.productData){
    this.productData.quantity=this.productQuantity
    if(!localStorage.getItem('user')){
      console.log(this.productData)
      this.product.AddToCart(this.productData)
    

    }else{
      
      let user =localStorage.getItem('user') as string
      let userId= JSON.parse(user).id 
      console.log(userId)
      let cartData:Icart={
        ...this.productData,
        userId,
        productId: this.productData.id,
      
      }
      delete cartData.id
      console.log(cartData)
      this.product.addToCrt(cartData).subscribe(res=>{
        if(res){
         this.product.getCartList(userId)
        }
      })
    }
  }
  }
  
  removeToCart(productId:string){
    if(!localStorage.getItem('user')){

      
       this.product.removeItemFromCart(productId)}

       else{
        console.log(this.cartData)
        this.cartData && this.product.removeToCart(this.cartData.id)
        .subscribe((result)=>{
          let user = localStorage.getItem('user');
          let userId= user && JSON.parse(user).id;
          this.product.getCartList(userId)
        })
       }
     
    }
    
  }

