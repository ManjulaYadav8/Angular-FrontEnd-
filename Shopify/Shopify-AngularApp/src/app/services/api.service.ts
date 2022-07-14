import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  cartItemList: any = [];
  cartItemsLength: number = 0;
  search = new BehaviorSubject<string>("");
  productList = new BehaviorSubject<any>([]);
  orders:any;
  BaseUrl:any="https://cs-artofa-demo-server.el.r.appspot.com";
  // BaseUrl:string="http://localhost:3000";

  
  constructor(private _http: HttpClient) { }

  cartProducts() {
    // console.log("cart products productList BehaviorSubject",this.productList)
    return this.productList;
  }

  getProducts() {
    console.log("getProducts");
   
    return this._http.get(`${this.BaseUrl}/products/getProducts`);
  }



  addtocart(product: any) {
    if(this.cartItemList.includes(product)){
      product.quantity+=1;
      product.total=product.variants[0].price*product.quantity;
    }
    else{
      this.cartItemList.push(product);
    }
    // console.log("productList BehaviorSubject",this.productList);
    // this.grandTotalPrice();
    this.productList.next(this.cartItemList);
    this.cartItemsLength = this.cartItemList.length;
    // console.log("cartItemsLength-->",this.cartItemsLength);
    // console.log("ServiceCartItemList",this.cartItemList);
  }


  grandTotalPrice(){
    let grandTotal=0;
    this.cartItemList.map((item:any)=>{
      grandTotal+=parseInt(item.total);
    })
    return grandTotal;
  }
  
  

 



}
