import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {


  loginUserForm: FormGroup;
  usersList: any;
  LoginUser: any;
  cartItemsList: any;
  IsError: boolean = false;
  active_customer:any;

  constructor(private _customerService: CustomerService, private _apiService: ApiService, private router: Router) {

    this.loginUserForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {

    this._customerService.getCustomers().subscribe((res: any) => {
      this.usersList = res;

      console.log(this.usersList);

    },
      (err: any) => {
        console.log(err);
      });

    this._apiService.cartProducts().subscribe(res => {
      this.cartItemsList = res;
    })

  }
  onSubmit() {
    this.LoginUser = this.loginUserForm.value;
    // console.log("newuserLogin-->",this.LoginUser);

    this.usersList.customers.map((customer: any) => {

      if (customer.email === this.LoginUser.email) {
          this.active_customer=customer;
          console.log(this.active_customer);
        
      }
    })

                // PopUp message
    if(this.active_customer){
      this._customerService.customer_active(this.active_customer);
       
        Swal.fire({
          'title': 'Success!',
          "text": "Login Sucessfully",
          "icon": 'success',
          "confirmButtonText": 'Ok'
        });
       
    }
    else{
      Swal.fire({
          'title': 'Error!',
          "text": "Invalid UserName and Password",
          "icon": 'error',
          "confirmButtonText": 'Ok'
        })
    }

   
    // console.log(this.loginUserForm.value);
  }

}
