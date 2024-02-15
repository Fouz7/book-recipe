import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FilterDialogComponent } from '@app/filter-dialog/filter-dialog.component';

@Component({
  selector: 'app-favorite-dialog',
  templateUrl: './favorite-dialog.component.html',
  styleUrl: './favorite-dialog.component.css'
})
export class FavoriteDialogComponent {

  constructor(public dialogRef: MatDialogRef<FilterDialogComponent>) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
