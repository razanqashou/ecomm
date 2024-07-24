import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../sevices/seller/product/product.service';
import { HttpClientModule } from '@angular/common/http';
import { Iproduct } from '../../../interfaces/product';
import{faTrash,faEdit} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { MatCardModule } from '@angular/material/card';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [ HttpClientModule, FontAwesomeModule, MatCardModule,DataTablesModule,RouterModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent implements OnInit {
productList:undefined |Iproduct[]
dtoption:Config={}
dttriger:Subject<any>=new Subject<any>();
data:Iproduct= {} as Iproduct
productMessage:undefined|string
icon=faTrash
EditIcon=faEdit
isproductmessageshow=false

  constructor( private product:ProductService){}
  
  ngOnInit(): void {
    
this.list()
; 
this.dtoption={
   pagingType:'full_number',
  lengthMenu:[3,5,8,10,15,25],
   pageLength:8,
   language:{
    searchPlaceholder:'enter product name',
    
   },
   scrollY:'300',
paging:false
 
}  
  }
  delete(id:string):void{
    this.product.deleteTodo(id).subscribe((result)=>{
      if(result){
        this.isproductmessageshow=true
        this.productMessage="product is deleted"
        this.list();
      }
    })
    
setTimeout(() =>{
  this.productMessage=undefined
  this.isproductmessageshow=false
},1000)

}
 list(){
  this.product.productList().subscribe((result)=>{
    console.log(result)
    if(result){
      this.productList=result
      this.dttriger.next(null)
    }

  })
 }

}


