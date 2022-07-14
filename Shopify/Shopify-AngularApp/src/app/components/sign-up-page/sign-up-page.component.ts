import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {

  createUserForm:FormGroup;
  createdMsg:string="";
  // IsCreated:boolean=false;

  constructor(private _customerService:CustomerService) {
    this.createUserForm=new FormGroup({

      first_name:new FormControl('',[Validators.required]),
      last_name:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required, Validators.email]),
      password:new FormControl('',[Validators.required])

    })

    
   }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.createUserForm.valid)
    if(this.createUserForm.valid){
      this._customerService.create_customer(this.createUserForm.value);
      // this.IsCreated=true;
      Swal.fire({
        'title': 'Success!',
        "text": "Sucessfully Created Your Account",
        "icon": 'success',
        "confirmButtonText": 'Ok'
      });
    }
    else{
      Swal.fire({
        'title': 'Info',
        "text": "Please provide Valid Information",
        "icon": 'info',
        "confirmButtonText": 'Ok'
      });
    }

      
    
  }

}
