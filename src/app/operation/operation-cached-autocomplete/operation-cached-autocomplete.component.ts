import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppCacheService } from '../../app-cache.service';

@Component({
  selector: 'app-operation-cached-autocomplete',
  templateUrl: './operation-cached-autocomplete.component.html',
  styleUrls: ['./operation-cached-autocomplete.component.scss']
})
export class OperationCachedAutocompleteComponent {
  @Input() operation: string = ""
  @Output() operationChange: EventEmitter<string> = new EventEmitter();
  fc = new FormControl();
  options: string[] = [];

  constructor(
    private db: AppCacheService
  ) {
    this.options = this.db.operations.map(op => op.operation);
    this.fc.valueChanges.subscribe(
      data => {
        this.operationChange.emit(data);
      }
    );
  }

}
