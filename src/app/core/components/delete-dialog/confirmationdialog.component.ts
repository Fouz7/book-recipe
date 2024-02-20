import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterDialogComponent } from '@app/core/components/filter-dialog/filter-dialog.component';

@Component({
  selector: 'confirmation-dialog',
  templateUrl: './confirmationdialog.component.html',
  styleUrl: './confirmationdialog.component.css',
})
export class ConfirmationDialogComponent {
  recipeName: string;
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { recipeName: string }
  ) {
    this.recipeName = data.recipeName;
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
