import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FilterDialogComponent } from '@app/core/components/filter-dialog/filter-dialog.component';

@Component({
  selector: 'app-favorite-dialog',
  templateUrl: './favorite-dialog.component.html',
  styleUrls: ['./favorite-dialog.component.css']
})
export class FavoriteDialogComponent {
  recipeName: string = '';

  constructor(
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { recipeName: string }
    ) {this.recipeName = data.recipeName;}

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
