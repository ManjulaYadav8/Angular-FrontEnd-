import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

   customer_data:any;

  constructor(private _apiService:ApiService, private _customerService:CustomerService) { }

  ngOnInit() {
    return this._customerService.getCustomers().subscribe((res:any)=>{
      this.customer_data=res;
      // console.log(this.customer_data);
    });
  }

}
