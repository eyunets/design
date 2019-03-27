import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatTabsModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatMenuModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule
} from '@angular/material';

@NgModule({
  imports: [
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    CommonModule,
    MatTabsModule,
    MatSidenavModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
  ],
  declarations: []
})
export class MaterialModule {}
