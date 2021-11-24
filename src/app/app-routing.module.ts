import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFormComponent } from './add-form/add-form.component';
import { FormUserComponent } from './form-user/form-user.component';
import { HomeComponent } from './home/home.component';
import { ListInvoiceComponent } from './list-invoice/list-invoice.component';
import { ListUserComponent } from './list-user/list-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { MainProductComponent } from './main-product/main-product.component';
import { MainProviderComponent } from './main-provider/main-provider.component';
import { MainUserComponent } from './main-user/main-user.component';
import { NotFoudPageComponent } from './not-foud-page/not-foud-page.component';

const routes: Routes = [
  {path: "home", component:HomeComponent},
  {path: "" ,redirectTo: "home", pathMatch: "full"},
  {path: "form/:id", component: AddFormComponent},
  {path: "provider", component: MainProviderComponent},
  {path: "product", component: MainProductComponent},
  {path: "user", component:MainUserComponent, children:[
    //{path:'category/:category',component :ListUserComponent}
    {path:"listuser/:category", component:ListUserComponent}
  ]},
  {path:'subscribe',component :FormUserComponent},
  {path: "login", component: LoginUserComponent},
  {path: "invoice", component: ListInvoiceComponent},
  {path:"**", component:NotFoudPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
