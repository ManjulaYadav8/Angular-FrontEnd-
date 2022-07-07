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
  // products:any;

  constructor( private _apiService:ApiService ) { }

  ngOnInit(){

    

     this._apiService.getProducts().subscribe((res)=>{
      this.data=res;
      // console.log("products-->",this.data);

      this.data.products?.map((element: any) => {
        if(!element.quantity){
          Object.assign(element, { quantity:1,total:element.variants[0].price})
        }

      });
      console.log("products-->",this.data);
    });

    this._apiService.search.subscribe((val)=>{
      this.searchText=val;
    })
  }


  addcart(item:any){
    this._apiService.addtocart(item);
  }
  

}
