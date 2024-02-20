import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateBookRecipeComponent } from '@app/feature/update-book-recipe/update-book-recipe.component';

@Component({
  selector: 'app-update-recipe-dialog',
  templateUrl: './update-recipe-dialog.component.html',
  styleUrl: './update-recipe-dialog.component.css'
})
export class UpdateRecipeDialogComponent {
  recipeName: string;
  constructor(
    public dialogRef: MatDialogRef<UpdateBookRecipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.recipeName = data.recipeName; // Inisialisasi properti recipeName dari data yang diterima
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
