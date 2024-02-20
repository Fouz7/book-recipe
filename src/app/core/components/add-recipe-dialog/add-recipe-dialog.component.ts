import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-recipe-dialog',
  templateUrl: './add-recipe-dialog.component.html',
  styleUrl: './add-recipe-dialog.component.css',
})
export class AddRecipeDialogComponent {
  recipeName: string;
  constructor(
    public dialogRef: MatDialogRef<AddRecipeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.recipeName = data.recipeName; // Inisialisasi properti recipeName dari data yang diterima
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
