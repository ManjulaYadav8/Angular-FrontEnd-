import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
  {path:'', redirectTo:'Homepage',pathMatch:'full'},
  {path:'Homepage', component: ProductsComponent},
  {path:'login', component:LoginPageComponent},
  {path:'login/register', component:SignUpPageComponent},
  {path:'cart', component:CartListComponent},
  {path:'checkout', component:CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
