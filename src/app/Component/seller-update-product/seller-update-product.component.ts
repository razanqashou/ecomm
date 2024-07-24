import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../sevices/seller/product/product.service';
import { Iproduct } from '../../../interfaces/product';

@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined|Iproduct
  isUpdated=false
  updateMes:undefined|string=''
  constructor(private router:ActivatedRoute ,private product:ProductService ){}
  ngOnInit(): void {
    let productId= this.router.snapshot.paramMap.get('id')
    console.log(productId)
    productId && this.product.getProduct(productId).subscribe((data)=>{
      console.log(data)
      this.productData=data;
    })
  }
  submit(data:any){
    if(this.productData){
      data.id=this.productData?.id

    }
    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        this.isUpdated=true
        this.updateMes='Update successfully'
      }
      setTimeout(() =>{
        this.updateMes=undefined
        this.isUpdated=false
      },1000)

    })
    console.log(data)
  }
}
