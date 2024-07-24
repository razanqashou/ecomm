import { CanActivateFn } from '@angular/router';
import { SellerService } from './sevices/seller/seller.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const sellerService=inject(SellerService)
  if(localStorage.getItem('seller')){
    return true;
  }
  return sellerService.isSellerLoddedIn;
};
