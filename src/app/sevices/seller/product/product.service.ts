import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Icart, Iproduct, order } from '../../../../interfaces/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartData = new EventEmitter<Iproduct[] | []>();
  cartData2 = new EventEmitter<Icart[] | []>();

  apiUrl = 'http://localhost:3000/product';
  constructor(private http: HttpClient) {}

  addProduct(data: Iproduct) {
    return this.http.post(this.apiUrl, data);
  }
  productList() {
    return this.http.get<Iproduct[]>('http://localhost:3000/product');
  }
  deleteTodo(productId: string) {
    return this.http.delete(`${this.apiUrl}/${productId}`);
  }
  getProduct(id: string) {
    return this.http.get<Iproduct>(`${this.apiUrl}/${id}`);
  }
  updateProduct(product: Iproduct) {
    return this.http.put<Iproduct>(`${this.apiUrl}/${product.id}`, product);
  }
  popularProduct() {
    return this.http.get<Iproduct[]>('http://localhost:3000/product?_limit=3');
  }
  homeProduct(){
    return this.http.get<Iproduct>('http://localhost:3000/product?_limit=3');
  
  }
  trendyProduct() {
    return this.http.get<Iproduct[]>('http://localhost:3000/product?_limit=9');
  }
  searchProduct(query: string) {
    const searchTerm = query; // Assuming you have `searchTerm` defined
    const url = `http://localhost:3000/product?_limit=9category=${query}`;

    return this.http.get<Iproduct[]>(url);
  }
  getsearchProduct(item:string){

  }
  AddToCart(data: Iproduct) {
    let cartData = [];
    let localCart = localStorage.getItem('localCarts');
    if (!localCart) {
      localStorage.setItem('localCarts', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCarts', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }
  removeItemFromCart(productId: string) {
    let cartData = localStorage.getItem('localCarts');
    if (cartData) {
      let items: Iproduct[] = JSON.parse(cartData);
      items = items.filter((item: Iproduct) => productId !== item.id);
      localStorage.setItem('localCarts', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }
  addToCrt(cartData: Icart) {
    return this.http.post<Icart[]>('http://localhost:3000/cart', cartData);
  }
  getCartList(userId: string) {
    return this.http
      .get<Iproduct[]>('http://localhost:3000/cart?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
        this.cartData.emit(result.body);
        }
      });
  }
  removeToCart(cartId: string) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }
  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Icart[]>(
      'http://localhost:3000/cart?userId=' + userData.id
    );
  }
 
  orderNow(data: order) {
    return this.http.post('http://localhost:3000/orders', data);
  }
  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>(
      'http://localhost:3000/orders?userId=' + userData.id
    );
  }
  deleteCartItems(cartId: string) {
    console.log(cartId)
    return this.http
      .delete('http://localhost:3000/cart/' + cartId, { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          this.cartData.emit([]);
        }
      });
  }
  cancelOrder(orderId:number){
    return this.http.delete('http://localhost:3000/orders/'+orderId)

  }

}
