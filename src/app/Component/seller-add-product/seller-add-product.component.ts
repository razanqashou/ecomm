import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../sevices/seller/product/product.service';
import { Iproduct } from '../../../interfaces/product';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {
  productAdded:string|undefined=''
  isproductAdded:boolean=false
  constructor(private addService:ProductService){}
submit(data:Iproduct){
  console.log(data)
this.addService.addProduct(data).subscribe((result)=>{
  if(result){
    this.isproductAdded=true
    this.productAdded="product  added successfully"
   
  }

  console.log(result)
});
setTimeout(() =>{
  this.productAdded=undefined
  this.isproductAdded=false
},1000)

}

}
