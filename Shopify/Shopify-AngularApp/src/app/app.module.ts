import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { ProductsComponent } from "./components/products/products.component";
import { HeaderComponent } from './components/header/header.component';
import { CustomersComponent } from './components/customers/customers.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HeaderComponent,
    CustomersComponent,
    LoginPageComponent,
    SignUpPageComponent,
    CartListComponent,
    CheckoutComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
  
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
