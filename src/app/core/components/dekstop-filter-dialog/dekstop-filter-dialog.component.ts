import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  selectedLevelId: string | null;
  levels: any[];
  categoryId: string | null;
  category: any[];
  time:  string | null;
  selectedSortOption: string | null;
  sortOptions: any[];
  sortTime : any[];
}

@Component({
  selector: 'app-dekstop-filter-dialog',
  templateUrl: './dekstop-filter-dialog.component.html',
  styleUrl: './dekstop-filter-dialog.component.css'
})
export class DekstopFilterDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DekstopFilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  resetFilters(): void {
    this.data.selectedLevelId = null;
    this.data.categoryId = null;
    this.data.time = null;
    this.data.selectedSortOption = null;
  }

}
