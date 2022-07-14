import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  active_customer:any;
  orders:any;
  BaseUrl:string="https://cs-artofa-demo-server.el.r.appspot.com";
  // BaseUrl:string="http://localhost:3000";
  
  constructor( private _http:HttpClient) { }

  getCustomers() {
    // console.log("getCustomers");
    return this._http.get(`${this.BaseUrl}/customers/getCustomers`);
  }

  customer_active(customer:any){
       this.active_customer=customer;
      // console.log("active_customer-->",this.active_customer);
      return this.active_customer;
  }


  //create-customer
  create_customer(new_customer){
    let body={
        first_name:new_customer.first_name,
        last_name:new_customer.last_name,
        email: new_customer.email,
        password:new_customer.password,
        state:new_customer.state,
        addresses:new_customer
    }
    console.log(body);
    return this._http.post(`${this.BaseUrl}/customers/create-customer`,body).subscribe((res)=>{
      // console.log("new_customer Added-->",res);
    },(err)=>{
      console.log(err);
    });
  }

  //update-customer

  update_customer(customer,shipping_address){
     let body={
      customer_id:customer.id,
      state:shipping_address.province,
      addresses:shipping_address

     }

     return this._http.put<any>(`${this.BaseUrl}/customers/update-customer`,body).subscribe(res=>{
      console.log("Updated successfully",res);
     },
     (err)=>{
      console.log(err);
     })
  }

  Orders(customer:any,cartItems:any,shipping_address:any){
    this.orders=cartItems;
    const url=`${this.BaseUrl}/orders/create-order`;
    // this.update_customer(customer,shipping_address);

    this.orders.forEach((or:any)=>{
      console.log("or----->",or)
      console.log(or.variants[0].id);
      let body={
          id:or.variants[0].id,
          quantity:or.quantity,
          customer:customer,
          billing_address:customer.addresses[0],
          shipping_address:shipping_address
      }
      console.log(body);

      this._http.post<any>(url,body).subscribe(res=>{
        console.log("OrdersList-->",res);
      },

      (err)=>{
        console.log(err);

      });
    })
  }
}
