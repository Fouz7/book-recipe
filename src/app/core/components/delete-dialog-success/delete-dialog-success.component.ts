import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterDialogComponent } from '@app/core/components/filter-dialog/filter-dialog.component';

@Component({
  selector: 'app-delete-dialog-success',
  templateUrl: './delete-dialog-success.component.html',
  styleUrl: './delete-dialog-success.component.css',
})
export class DeleteDialogSuccessComponent {
  recipeName: string;
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogSuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { recipeName: string }
  ) {
    this.recipeName = data.recipeName;
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
