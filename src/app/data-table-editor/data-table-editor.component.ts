import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  @Output() more: EventEmitter<void> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Output() copy: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() reload: EventEmitter<any> = new EventEmitter();

  constructor() { }

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
