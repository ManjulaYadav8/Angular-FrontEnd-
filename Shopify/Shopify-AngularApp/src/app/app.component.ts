import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Shopify-AngularApp';

  data:any;


  constructor() { }

  ngOnInit(){

  //   window.addEventListener("keyup", disableF5);

  //    window.addEventListener("keydown", disableF5);

   

  //   function disableF5(e:any) {

  //      if ((e.which || e.keyCode) == 116) e.preventDefault(); 

  //   };
  this.data={

    user:[{
      fruits:{
        fruit1:"apple",
        fruit2:"mango"
    }}
    ]
  }

    
  }
 
  

}
