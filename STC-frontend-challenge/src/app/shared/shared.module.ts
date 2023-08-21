import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';



const MaterialModules = [
  MatProgressSpinnerModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule
]

const Forms=[
FormsModule,
ReactiveFormsModule,
MatFormFieldModule,
MatInputModule
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MaterialModules,
    ...Forms

  ],
  exports: [...MaterialModules,...Forms ]
})
export class SharedModule { }
