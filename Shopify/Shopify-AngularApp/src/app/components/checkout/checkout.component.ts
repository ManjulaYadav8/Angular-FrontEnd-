import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  grandTotal:number=0;
  active_customer:any;
  userShippingInfo:any;
  cartList:any;
  Isorder:boolean=false;

  UserOrderForm:FormGroup;

  constructor(private _apiService:ApiService, private _customerService:CustomerService) {
    this.UserOrderForm=new FormGroup({
      country:new FormControl('',[Validators.required]),
      first_name:new FormControl('',[Validators.required]),
      last_name:new FormControl('',[Validators.required]),
      address1:new FormControl('',[Validators.required]),
      address2:new FormControl('',[Validators.required]),
      city:new FormControl('',[Validators.required]),
      province:new FormControl('',[Validators.required]),
      zip:new FormControl('',[Validators.required]),
      phone:new FormControl('',[Validators.required])
    })
   }
  
  ngOnInit(): void {
    this.grandTotal=this._apiService.grandTotalPrice();
    // console.log(this.grandTotal);

    this.active_customer=this._customerService.active_customer;
    // console.log("checkout-active_customer-->",this.active_customer);

    this.cartList=this._apiService.cartItemList;
    // console.log("checkout-CartList-->",this.cartList);

  }

 

  place_an_order(){
    // this._customerService.Orders(this.active_customer,)
    this.userShippingInfo=this.UserOrderForm.value;
    // console.log(this.userShippingInfo);
    this.Isorder=true;
    
    this._customerService.Orders(this.active_customer,this.cartList,this.UserOrderForm.value);
   
  }
  
  

}
