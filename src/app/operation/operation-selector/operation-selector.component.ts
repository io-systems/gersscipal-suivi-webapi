import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Operation } from '../../api/models/operation';
import { OperationControllerService } from '../../api/services/operation-controller.service';

@Component({
  selector: 'app-operation-selector',
  templateUrl: './operation-selector.component.html',
  styleUrls: ['./operation-selector.component.scss']
})
export class OperationSelectorComponent implements OnInit {
  operations: Operation[] = []
  @Input() selectedOperation: Operation;
  @Input() selectedOperationName: string;
  @Output() selectedOperationNameChange: EventEmitter<string> = new EventEmitter();
  @Output() setOperation: EventEmitter<Operation> = new EventEmitter();
  @Output() setOperationName: EventEmitter<Operation> = new EventEmitter();
  selected = "";

  constructor(
    private db: OperationControllerService
  ) { }

  ngOnInit(): void {
    this.refreshOperations();
  }
  ngOnChanges(s: SimpleChanges) {
    if (s.hasOwnProperty("selectedOperation")) this.updateSelected();
    if (s.hasOwnProperty("selectedOperationName")) this.updateSelectedName();
  }

  selectionChange(event: any) {
    this.setOperationName.emit(event.value);
    this.selectedOperationNameChange.emit(event.value);
    const tmp = this.operations.find(ws => ws.operation === event.value);
    if (tmp) this.setOperation.emit(tmp);
  }

  async refreshOperations() {
    try{
      this.operations = await this.db.find().toPromise();
      this.updateSelected();
      this.updateSelectedName();
    }catch(e){
      console.log("OperationSelectorComponent: refresh error", e);
    }
  }
  updateSelected(): void {
    if (this.selectedOperation && this.operations.length > 0) {
      const tmp = this.operations.find(ws => ws.operation === this.selectedOperation.operation);
      this.selected = (tmp && tmp.operation) ? tmp.operation : "";
    }else{
      this.selected = "";
    }
  }
  updateSelectedName(): void {
    if (this.selectedOperationName && this.operations.length > 0) {
      const tmp = this.operations.find(ws => ws.operation === this.selectedOperationName);
      this.selected = (tmp && tmp.operation) ? tmp.operation : "";
    }else{
      this.selected = "";
    }
  }

}
