import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  selectedLevelId: string | null;
  levels: any[];
  categoryId: string | null;
  category: any[];
  time: string | null;
  sortTime: any[];
}

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css'],
})
export class FilterDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }

  resetFilters(): void {
    this.data.selectedLevelId = null;
    this.data.categoryId = null;
    this.data.time = null;
  }
}
