import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SchemaInfoDialogComponent } from '../indicators/schema-info-dialog/schema-info-dialog.component';

@Component({
  selector: 'app-data-table-editor',
  templateUrl: './data-table-editor.component.html',
  styleUrls: ['./data-table-editor.component.scss']
})
export class DataTableEditorComponent {
  @Input() dataArray: any[];
  @Input() dataCount: any = {count: 0}
  @Input() displayedColumns: string[];
  @Input() addButtonText: string = "";
  @Input() schemaName: string = "";
  @Output() more: EventEmitter<void> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Output() copy: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() reload: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialog: MatDialog
  ) { }

  _info(): void {
    this.dialog.open(SchemaInfoDialogComponent, {
      width: '65vw',
      data: {schemaName: this.schemaName}
    });
  }
  _more(): void {
    this.more.emit();
  }
  _reload(): void {
    this.reload.emit();
  }
  _create(): void {
    this.create.emit();
  }
  _update(event): void {
    this.update.emit(event);
  }
  _copy(event): void {
    this.copy.emit(event);
  }
  _delete(event): void {
    this.delete.emit(event);
  }

}
