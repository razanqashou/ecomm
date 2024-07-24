import { Routes } from '@angular/router';
import { HomeComponent } from './Component/header/home/home.component';
import { SellerAuthComponent } from './Component/header/seller-auth/seller-auth.component';
import { LoginComponent } from './Component/login/login.component';
import { SellerHomeComponent } from './Component/seller-home/seller-home.component';
import { authGuard } from './auth.guard';
import { NotFoundComponent } from './Component/not-found/not-found.component';
import { SellerAddProductComponent } from './Component/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './Component/seller-update-product/seller-update-product.component';
import { SearchComponent } from './Component/search/search.component';
import { ProductDetailsComponent } from './Component/product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './Component/cart-page/cart-page.component';
import { CheckoutComponent } from './Component/checkout/checkout.component';
import { MyOrderComponent } from './Component/my-order/my-order.component';

export const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'}, 

  { path: 'home', component: HomeComponent },
  { path: 'seller', component: SellerAuthComponent },
  {path:'user',component:UserAuthComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'my-order',component:MyOrderComponent},


  {path:'search/:query' , component:SearchComponent},

  {path:'cart-page' , component:CartPageComponent},

  { path: 'login', component: LoginComponent },
  {path:'seller-add-product' , component:SellerAddProductComponent,    canActivate: [authGuard],
},
{path:'seller-update-product/:id' , component:SellerUpdateProductComponent,    canActivate: [authGuard],},

  {
    path: 'seller-home',
    component: SellerHomeComponent,
    canActivate: [authGuard],
  },
{
  component:ProductDetailsComponent,
  path:'details/:productId'
},
  // { path: '**', component: NotFoundComponent },
];
