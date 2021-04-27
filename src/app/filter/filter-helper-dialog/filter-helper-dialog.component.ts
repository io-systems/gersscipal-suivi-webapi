import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterHelperComponent } from '../filter-helper/filter-helper.component';

@Component({
  selector: 'app-filter-helper-dialog',
  templateUrl: './filter-helper-dialog.component.html',
  styleUrls: ['./filter-helper-dialog.component.scss']
})
export class FilterHelperDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<FilterHelperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  cancel(): void {
    this.dialogRef.close();
  }

}
