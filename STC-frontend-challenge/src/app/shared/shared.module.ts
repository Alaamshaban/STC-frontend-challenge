import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';

const MaterialModules = [
  MatProgressSpinnerModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatBadgeModule,
  MatDialogModule,
  MatSelectModule
]

const Forms=[
FormsModule,
ReactiveFormsModule,
MatFormFieldModule,
MatInputModule
]


@NgModule({
  declarations: [
    StarRatingComponent
  ],
  imports: [
    CommonModule,
    ...MaterialModules,
    ...Forms

  ],
  exports: [...MaterialModules,...Forms,StarRatingComponent ]
})
export class SharedModule { }
