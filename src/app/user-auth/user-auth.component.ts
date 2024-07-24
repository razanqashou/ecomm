import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Ilogin, IsignUp } from '../../interfaces/singup';
import { UserService } from '../sevices/user.service';
import { Icart, Iproduct } from '../../interfaces/product';
import { ProductService } from '../sevices/seller/product/product.service';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, TranslateModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {
  showLogin=false;
  usr:IsignUp[]=[]
  keyup:boolean=false
  newSingUp: IsignUp = {} as IsignUp;
  newlogin: Ilogin = {} as Ilogin;

  authError:string=''

constructor(private translate:AppComponent,private user:UserService, private product:ProductService){}

openLogin() {
  this.showLogin=true
  }
  keyups(){
this.keyup=true
  }
  openSignUp(){
    this.showLogin=false

  }
  signUp(data:IsignUp){
    const newsign1 = {
      name: this.newSingUp.name,
      email: this.newSingUp.email,
      password: this.newSingUp.password,
    
    };
    this.newSingUp = newsign1;
    this.user.userSignUp(this.newSingUp)
    
  }
  login(data:Ilogin){
    this.user.userLogin(data)
    this. user.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError="Email or password is not correct";
      }else{
        this.localCartToRemoteCart()
      }
  })
  }
  localCartToRemoteCart(){
    let data = localStorage.getItem('localCarts') as string;
    let user = localStorage.getItem('user') as string;
    let userId= user && JSON.parse(user).id;
    if(data){
     let cartDataList:Iproduct[]= JSON.parse(data);
   
     cartDataList.forEach((product:Iproduct, index)=>{
       let cartData:Icart={
         ...product,
         productId:product.id,
         userId
       }
       delete cartData.id;
       setTimeout(() => {
         this.product.addToCrt(cartData).subscribe((result)=>{
           if(result){
             console.warn("data is stored in DB");
           }
         })
       }, 500);
       if(cartDataList.length===index+1){
         localStorage.removeItem('localCarts')
       }
     })
    }
 
    setTimeout(() => {
     this.product.getCartList(userId)
    }, 200);
     
   }}