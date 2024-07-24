import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import{faBars} from '@fortawesome/free-solid-svg-icons';
import{faClose} from '@fortawesome/free-solid-svg-icons';
import{faHome} from '@fortawesome/free-solid-svg-icons';
import{faShop} from '@fortawesome/free-solid-svg-icons';
import{faSignOut} from '@fortawesome/free-solid-svg-icons';
import{faAdd} from '@fortawesome/free-solid-svg-icons';
import{faTags} from '@fortawesome/free-solid-svg-icons';
import{faLanguage} from '@fortawesome/free-solid-svg-icons';

import{faCartShopping} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { TranslationService } from '../../../sevices/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from '../../../sevices/seller/product/product.service';
import { Iproduct } from '../../../../interfaces/product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule,FontAwesomeModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
cart=faCartShopping
  menuType:string='def'
  
sellerName:string=''
  menuicon=faBars
  ismenuclick=false
  close=faClose
  language=faLanguage
 home=faHome
 shope=faShop
 logouts=faSignOut
 add=faAdd
 tad=faTags
 lang:string=''
 isLang:boolean=false
 searchResult:undefined|Iproduct[];
 isSubmit:boolean=false
searchTerm: string='';
cartItem=0;
userName:string=''
userlogin:boolean=true
constructor(private route:Router , private translate:TranslateService, private service:ProductService){}
  ngOnInit(): void {
    this.route.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller')){
         let sellerStor=localStorage.getItem('seller')
         let sellerData=  sellerStor && JSON.parse(sellerStor)[0]
         this.sellerName=sellerData.name
          this.menuType='seller'
        }
        else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName= userData.name;
          this.menuType='user';
          this.service.getCartList(userData.id);
        }
         else {
          this.menuType = 'default';
        }
      }

    })
    this.lang=localStorage.getItem('lang')||'arabic'
    let cartData=localStorage.getItem('localCarts')
if(cartData){
  this.cartItem=JSON.parse(cartData).length
}
this.service.cartData.subscribe(item=>{
  this.cartItem=item.length
})


  }



  islangClicked(){
    this.isLang=true
    setTimeout(() =>{
  
      this.isLang=false
    },3000)
    
  }
  ChangeLang(lang:any){
const selelan=lang.target.value
localStorage.setItem('lang',selelan)
this.translate.use(selelan)
  }
menu(){
  this.ismenuclick=true
  setTimeout(() =>{
  
    this.ismenuclick=false
  },3000)
  
}
closes(){
  // this.ismenuclick=false
  
setTimeout(() =>{
  
  this.ismenuclick=false
},300)

}
  logoutseller(){
    localStorage.removeItem('seller')
    this.route.navigate(['/home'])

  }
  logoutuser(){
    localStorage.removeItem('user')
    this.route.navigate(['/home'])
    this.userlogin=true
    this.service.cartData.emit([])

  }
  searchProduct(query:KeyboardEvent){


    if(query){
      const element=query.target as HTMLInputElement;
     
  
this.service.searchProduct(element.value).subscribe(res=>{
  // if(res.length>=10){
  //   res.length=length
  // }
  const limitedResults = res.filter(product =>
    product.category.toLowerCase().includes(element.value.toLowerCase())
  );
  this.searchResult=limitedResults

})
      
}

}
redirectToDetails(id:string){
  this.route.navigate(['/details/'+ id])
  this.isSubmit=true

}
submitSearch(val:string){
  console.log(val);
  this.route.navigate([`search/${val}`])
  this.isSubmit=true
}
userloginn(){
this.route.navigate(['/user'])
  this.userlogin=false

}
category(val:string){
  if(val=='bag'){
  this.route.navigate([`search/bag`])}
  else if(val=='jacket'){
    this.route.navigate([`search/jacket`])}
    else if(val=='pinkbag'){
      this.route.navigate([`search/pink bag`])}
      else if(val=='redbag'){
        this.route.navigate([`search/red bag`])}
        else if(val=='blackbag'){
          this.route.navigate([`search/black bag`])}
      

      this.isSubmit=true
    }

  

}

