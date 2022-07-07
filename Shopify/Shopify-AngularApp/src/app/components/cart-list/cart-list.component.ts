import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit, OnChanges, DoCheck {

  cartProductList: any;
  grandTotal:number=0;
  active_customer:any;

  // quantity: number = 1;

  constructor(private _apiService: ApiService,private _customerService:CustomerService, private router:Router) { }

  ngOnInit(): void {

    this._apiService.cartProducts().subscribe((res:any)=> {

      this.cartProductList = res;
      console.log("cartProductList-->",this.cartProductList);
      
    });

    this.grandTotal=this._apiService.grandTotalPrice()
   this.active_customer=this._customerService.active_customer;
    console.log("cartList_activeCustomer-->",this.active_customer)

    // this.cartProductList.forEach((item:any)=>{
      
    //   this.grandTotal+=parseInt(item.total);
    // })
    // this._apiService.productList.next(this.cartProductList);

  }
  ngDoCheck(): void {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }





  Increment(id: any) {
    this.cartProductList.forEach((ele: any) => {
      if (ele.id == id) {
          ele.quantity += 1;
          ele.total=ele.variants[0].price*ele.quantity;
          this.grandTotal+=parseInt(ele.variants[0].price);
          
        }
    })
   
  }

  Decrement(id: any) {
    this.cartProductList.forEach((ele: any) => {
      if (ele.id == id) {
          ele.quantity -=1;
          if(ele.quantity<1){
            ele.quantity=1;
          }
        ele.total-=ele.variants[0].price;
        this.grandTotal-=parseInt(ele.variants[0].price)

      }
     
    })
   

  }

  RemoveFromCart(itemId:any){
    this.cartProductList.forEach((item:any, index:any)=>{
      if(item.id==itemId){
        this.cartProductList.splice(index,1);
        this.grandTotal-=parseInt(item.total);
      }
    })
       this._apiService.productList.next(this.cartProductList);
  }
  

  checkout() {
  
    if(this.active_customer){
    this.router.navigate(["checkout"]);
    }
    else{
      this.router.navigate(["login"])
    }
}








}
