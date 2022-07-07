import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {

  createUserForm:FormGroup;

  constructor(private _customerService:CustomerService) {
    this.createUserForm=new FormGroup({
      first_name:new FormControl('',[Validators.required,Validators.minLength(5)]),
      last_name:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required, Validators.email]),
      password:new FormControl('',[Validators.required])

    })

    
   }

  ngOnInit(): void {
  }

  onSubmit(){
      this._customerService.create_customer(this.createUserForm.value);
    
  }

}
