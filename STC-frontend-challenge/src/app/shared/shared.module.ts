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
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

const MaterialModules = [
  MatProgressSpinnerModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatBadgeModule,
  MatDialogModule,
  MatSelectModule,
  MatToolbarModule,
  MatSnackBarModule
]

const Forms=[
FormsModule,
ReactiveFormsModule,
MatFormFieldModule,
MatInputModule
]


@NgModule({
  declarations: [
    StarRatingComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    ...MaterialModules,
    ...Forms

  ],
  exports: [...MaterialModules,...Forms,StarRatingComponent,ToolbarComponent ]
})
export class SharedModule { }
