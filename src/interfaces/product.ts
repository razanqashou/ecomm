export interface Iproduct {
  name: string;
  color: string;
  id: string;
  price: string;
  category: string;
quantity:undefined|number
  description: string;
  image: string;
  productId:string|undefined
}
export interface Icart{
  name: string;
  color: string;
  id: string|undefined;
  price: string;
  category: string;
quantity:undefined|number
  description: string;
  image: string;
  userId:number|null;
  productId:string
}
export interface priceSummary{
  price:number,
  discount:number,
  tax:number,
  delivery:number,
  total:number
}
export interface order {
  email:string,
  address:string,
  contact:number,
  totalPrice:number,
  userId:string,
  id:number|undefined
}
