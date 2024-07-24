import { Component, OnInit, ViewChild } from '@angular/core';
import { Icart, Iproduct } from '../../../../interfaces/product';
import { ProductService } from '../../../sevices/seller/product/product.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductDetailsComponent } from '../../product-details/product-details.component';


@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports:[ 
    NgbModule
    ,CommonModule,FormsModule,RouterModule,ProductDetailsComponent],
 
})
export class HomeComponent implements OnInit {
 popularProducts:undefined|Iproduct[];
 trendyProducts:undefined|Iproduct[];
  
 productData:undefined|Iproduct;

  constructor(private product:ProductService) {}

  ngOnInit(): void {
   
    this.product.popularProduct().subscribe((data)=>{
      this.popularProducts=data;
    })
    

    this.product.trendyProduct().subscribe((data)=>{
      this.trendyProducts=data;
      
    })
    console.log(this.trendyProducts)
  }
  
}