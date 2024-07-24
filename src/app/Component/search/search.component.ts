import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../../../interfaces/product';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../sevices/seller/product/product.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header/header.component";

@Component({
    selector: 'app-search',
    standalone: true,
    templateUrl: './search.component.html',
    styleUrl: './search.component.css',
    imports: [CommonModule, HeaderComponent,RouterModule]
})
export class SearchComponent implements OnInit {
  searchResult:undefined|Iproduct[]
  getsearchResult:undefined|Iproduct[]

  constructor(private activeRoute: ActivatedRoute, private product:ProductService) { }
  ngOnInit(): void {
    
      let query = this.activeRoute.snapshot.paramMap.get('query');
      if(query)
      console.log(query);
      query && this.product.searchProduct(query).subscribe((result)=>{
       
        this.searchResult=result;}
        
      )
      
      
  
    }

 
}
