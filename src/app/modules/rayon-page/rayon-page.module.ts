import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RayonPageRoutingModule } from './rayon-page-routing.module';
import { ListRayonComponent } from 'src/app/list-rayon/list-rayon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListRayonComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RayonPageRoutingModule
  ]
})
export class RayonPageModule { }
