import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserViewComponent } from './user-view/user-view.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UserViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
