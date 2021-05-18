import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-schema-info-dialog',
  templateUrl: './schema-info-dialog.component.html',
  styleUrls: ['./schema-info-dialog.component.scss']
})
export class SchemaInfoDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SchemaInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }

}
