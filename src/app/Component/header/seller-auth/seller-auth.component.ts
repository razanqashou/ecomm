import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { SellerService } from '../../../sevices/seller/seller.service';
import { Ilogin, IsignUp } from '../../../../interfaces/singup';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../../sevices/translation.service';
import { AppComponent } from '../../../app.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, TranslateModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css',
})
export class SellerAuthComponent implements OnInit {
  keyup:boolean=false
  newSingUp: IsignUp = {} as IsignUp;
  signUps: IsignUp[] = [];
 showLogin=false
 authError:string=''
lang:any=''
isLoginError = new Subject<boolean>();
  constructor(private service: SellerService, private router: Router,private translate:AppComponent) {
   
  }
  ngOnInit(): void {
    this.service.reloadSeller();
   this.lang= this.translate.getlang()

  }
  singUp(): void {
    const newsign1 = {
      name: this.newSingUp.name,
      email: this.newSingUp.email,
      password: this.newSingUp.password,
       
    };
    this.newSingUp = newsign1;

    this.service.userSignUp(this.newSingUp);
  }
  keyUp(){
    this.keyup=true
  }
  
  login(data:Ilogin):void{
console.log(data)
this.service.userLogin(data)
this.service.isLoginError.subscribe((isError)=>{
  if(isError){
    this.authError="Email or password is not correct";
  }
})


  }

  openLogin() {
    this.showLogin=true
    }
    openSignUp(){
      this.showLogin=false

    }
}
