import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Component/header/header/header.component';
import { TranslateService } from '@ngx-translate/core';
import { FooterComponent } from "./Component/footer/footer.component";



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, FooterComponent]
})
export class AppComponent  implements OnInit{
  
  title = 'firstAngularProject';
translateService=inject(TranslateService)
ngOnInit(): void {
  this.translateService.setDefaultLang('en-us')
  this.translateService.use(localStorage.getItem('lang') ||'arabic')

}
getlang(){
  this.translateService.use(localStorage.getItem('lang') ||'arabic')

}
}
