import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { SharedModule } from '../shared/shared.module';
import { AddProductComponent } from './add-product/add-product.component';


@NgModule({
  declarations: [
    AdminViewComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
