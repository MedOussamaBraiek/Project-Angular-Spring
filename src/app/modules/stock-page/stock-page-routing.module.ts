import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListStockComponent } from 'src/app/list-stock/list-stock.component';
import { StockDetailComponent } from 'src/app/stock-detail/stock-detail.component';

const routes: Routes = [
  {path:"",component:ListStockComponent},
  {path:":idStock",component:StockDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockPageRoutingModule { }
