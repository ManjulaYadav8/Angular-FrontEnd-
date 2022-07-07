import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchBox:boolean=true;
  searchTerm:string="";
  totalItem:number=0;
  constructor( private _apiService:ApiService) { }

  ngOnInit(){
     this._apiService.cartProducts().subscribe((res:any)=>{
        this.totalItem=res.length;
     })
    
  }

  SearchFalse(){
    return this.searchBox=false;
  }
  SearchTrue(){
    return this.searchBox=true;
  }

  //sending products name to apiservice
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this._apiService.search.next(this.searchTerm);
  }



}
