import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Ilogin, IsignUp } from '../../../interfaces/singup';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  apiUrl="http://localhost:3000/seller"
  newSingUp:IsignUp={}as IsignUp
  signUps:IsignUp[]=[]
  isLoginError = new EventEmitter<boolean>(false);

  isSellerLoddedIn=new BehaviorSubject<boolean>(false)
  constructor(private http:HttpClient , private router: Router) { }
  
  userSignUp(data:IsignUp){
    this.http.post<IsignUp>(this.apiUrl,data,{observe:'response'}).subscribe((result) =>{
if(result.body){
  this.isSellerLoddedIn.next(true)
  localStorage.setItem('seller',JSON.stringify(result.body))

      this.signUps.push(result.body);
      if(result.body.email&& result.body.name&& result.body.password !=null){
    this.router.navigate(['seller-home'])
      }
      
    }})
  
  }
reloadSeller(){
  if(localStorage.getItem('seller')){
    this.isSellerLoddedIn.next(true)
    this.router.navigate(['seller-home'])
  }

}

userLogin(data: Ilogin) {
  // Use POST request for security (highly recommended)
  this.http.get<IsignUp[]>(`http://localhost:3000/seller?password=${data.password}&email=${data.email}`,  { observe: 'response' })
    .subscribe((result: any) => {
      
      if (result && result.body && result.body.length===1) {
        this.isLoginError.emit(false);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      } else {
        this.isLoginError.emit(true);
        console.log("Login failed");
      }
    },
    (error) => {
      console.error("Login error:", error);
      this.isLoginError.emit(true);
    });
}
  
}
