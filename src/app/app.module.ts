import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { ListUserComponent } from './list-user/list-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainProductComponent } from './main-product/main-product.component';
import { MainProviderComponent } from './main-provider/main-provider.component';
import { MainUserComponent } from './main-user/main-user.component';
import { NotFoudPageComponent } from './not-foud-page/not-foud-page.component';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AddFormComponent } from './add-form/add-form.component';
import { FormUserComponent } from './form-user/form-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { ListInvoiceComponent } from './list-invoice/list-invoice.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ErrorComponent } from './error/error.component';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { ListProductsComponent } from './list-products/list-products.component';
import { FormProductsComponent } from './form-products/form-products.component';
import { ShopComponent } from './shop/shop.component';
import { DetailFactureComponent } from './detail-facture/detail-facture.component';

import { ListFournisseurComponent } from './list-fournisseur/list-fournisseur.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    ListUserComponent,
    MainProductComponent,
    MainProviderComponent,
    MainUserComponent,
    NotFoudPageComponent,
    CustomerComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AddFormComponent,
    FormUserComponent,
    LoginUserComponent,
    AddInvoiceComponent,
    EditInvoiceComponent,
    ListInvoiceComponent,
    AddUserComponent,
    ErrorComponent,
    ListProductsComponent,
    FormProductsComponent,
    ShopComponent,
    DetailFactureComponent,
    ListFournisseurComponent,
    WelcomeComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
