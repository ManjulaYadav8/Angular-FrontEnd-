import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';




@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  data:any;
  searchText:string="";
  view_product:any;
  product_des:string="";

  
  // products:any;

  constructor( private _apiService:ApiService ) { }

  ngOnInit(){

    
      //Storing products details into data variable
      this._apiService.getProducts().subscribe((res)=>{
      this.data=res;
      console.log("products-->",this.data);

      //Assigning quantity and total keys to products details for further use
      this.data.products?.map((element: any) => {
        if(!element.quantity){
          Object.assign(element, { quantity:1,total:element.variants[0].price})
        }

      });
      // console.log("products-->",this.data);
    });

    

    //getting search keywords from apiService and storing in serach Text keyword
    this._apiService.search.subscribe((val)=>{
      this.searchText=val;
    })
  }

  //posting productas to cartList
  addcart(item:any){
    this._apiService.addtocart(item);
  }
  
  viewProduct(item:any){
    this.view_product=item;
    console.log(this.view_product);
    let first_index=this.view_product.body_html.indexOf(">");
    let last_index=this.view_product.body_html.indexOf("<",1);
    this.product_des=this.view_product.body_html.substring(first_index+1,last_index);
    console.log("Description----->",this.product_des);

  }

  // Increment(id: any) {
  //   this.cartProductList.forEach((ele: any) => {
  //     if (ele.id == id) {
  //         ele.quantity += 1;
  //         ele.total=ele.variants[0].price*ele.quantity;
  //         this.grandTotal+=parseInt(ele.variants[0].price);
          
  //       }
  //   })
   
  // }

  // Decrement(id: any) {
  //   this.cartProductList.forEach((ele: any) => {
  //     if (ele.id == id) {
  //         ele.quantity -=1;
  //         if(ele.quantity<1){
  //           ele.quantity=1;
  //         }
  //       ele.total-=ele.variants[0].price;
  //       this.grandTotal-=parseInt(ele.variants[0].price)

  //     }
     
  //   })
   

  // }

}
