import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatIconModule, MatPaginatorModule,
  MatDialogModule, MatDividerModule, MatFormFieldModule, MatInputModule,
  MatExpansionModule, MatTooltipModule, MatSnackBarModule, MatTabsModule,
  MatCardModule, MatSelectModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatListModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule, MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule
  ],
  exports: [MatButtonModule, MatIconModule, MatPaginatorModule, MatDialogModule,
    MatDividerModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatTooltipModule,
    MatSnackBarModule, MatTabsModule, MatCardModule, MatSelectModule, MatRadioModule,
    MatDatepickerModule, MatNativeDateModule, MatListModule]
})
export class MaterialModule { }
