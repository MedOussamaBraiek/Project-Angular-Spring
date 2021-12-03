import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockPageRoutingModule } from './stock-page-routing.module';
import { ListStockComponent } from 'src/app/list-stock/list-stock.component';
import { StockDetailComponent } from 'src/app/stock-detail/stock-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListStockComponent,
    StockDetailComponent,
  ],
  imports: [
    CommonModule,
    StockPageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class StockPageModule { }
