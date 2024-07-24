import { EventEmitter, Injectable } from '@angular/core';
import { Ilogin, IsignUp } from '../../interfaces/singup';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoginError = new EventEmitter<boolean>(false);
  signUps:IsignUp[]=[]

  isSellerLoddedIn=new BehaviorSubject<boolean>(false)
  constructor(private http:HttpClient , private router: Router) { }
  
  userSignUp(data:IsignUp){
    this.http.post<IsignUp>("http://localhost:3000/user" ,data,{observe:'response'}).subscribe((result) =>{
if(result.body){
  this.isSellerLoddedIn.next(true)

  localStorage.setItem('user',JSON.stringify(result.body))
  this.signUps.push(result.body);
      if(result.body.email&& result.body.name&& result.body.password !=null){
    this.router.navigate(['/home'])

      
      }
      } 
      
    })
  
  
}
  userLogin(data:Ilogin){
    this.http.get<IsignUp[]>(`http://localhost:3000/user?password=${data.password}&email=${data.email}`,
    {observe:'response'}).subscribe(
     ( result:any)=>{
      
      
        if(result.body?.length && result ){
          this.isLoginError.emit(false);

          localStorage.setItem('user',JSON.stringify(result.body[0]))
            this.router.navigate(['/home'])
              } else {
                this.isLoginError.emit(true);
                console.log("Login failed");
              }
            }
      
    )
  } 
}
