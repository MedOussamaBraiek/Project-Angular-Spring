import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRayonComponent } from 'src/app/list-rayon/list-rayon.component';

const routes: Routes = [
  {path:"",component:ListRayonComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RayonPageRoutingModule { }
