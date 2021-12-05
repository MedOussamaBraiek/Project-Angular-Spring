import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFormComponent } from './add-form/add-form.component';
import { DetailFactureComponent } from './detail-facture/detail-facture.component';
import { FormUserComponent } from './form-user/form-user.component';
import { HomeComponent } from './home/home.component';
import { ListFournisseurComponent } from './list-fournisseur/list-fournisseur.component';
import { ListInvoiceComponent } from './list-invoice/list-invoice.component';
import { ListUserComponent } from './list-user/list-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { MainProductComponent } from './main-product/main-product.component';
import { MainProviderComponent } from './main-provider/main-provider.component';
import { MainUserComponent } from './main-user/main-user.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { detailFacture } from './models/detailFacture';
import { NotFoudPageComponent } from './not-foud-page/not-foud-page.component';
import { ShopComponent } from './shop/shop.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {path: "home", component:HomeComponent},
  {path: "" ,redirectTo: "home", pathMatch: "full"},
  {path: "form/:id", component: AddFormComponent},
  
  
  {path: "shop/:ClientConnecte", component: ShopComponent},
  {path: "facture/:ClientConnecte", component: DetailFactureComponent},
  {path: "welcome", component: WelcomeComponent},
  {path: "admin", component: AdminComponent, children:[
    {path: "product", component: MainProductComponent},
    {path: "fournisseur", component: ListFournisseurComponent},
    {path: "provider", component: MainProviderComponent},
    {path: "shop", component: ShopComponent},
    {path: "stocks",loadChildren:()=>import('../app/modules/stock-page/stock-page.module').then(s=>s.StockPageModule)},
    {path:"stocks/",loadChildren:()=>import('../app/modules/stock-page/stock-page.module').then(s=>s.StockPageModule)},
    {path:"rayons",loadChildren:()=>import('../app/modules/rayon-page/rayon-page.module').then(r=>r.RayonPageModule)},
    {path: "user", component:MainUserComponent, children:[
      //{path:'category/:category',component :ListUserComponent}
      {path:"listuser/:category", component:ListUserComponent}
    ]},
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
