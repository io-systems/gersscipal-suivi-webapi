import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { concatMap, filter, map, startWith } from 'rxjs/operators';
import { AngularDataFilterControllerService } from '../../api/services/angular-data-filter-controller.service';
import { FabricationOrderControllerService } from '../../api/services/fabrication-order-controller.service';
import { MessageStandardControllerService } from '../../api/services/message-standard-controller.service';
import { MessageStatusControllerService } from '../../api/services/message-status-controller.service';
import { OperationControllerService } from '../../api/services/operation-controller.service';
import { WorkshopControllerService } from '../../api/services/workshop-controller.service';
import { WorkstationControllerService } from '../../api/services/workstation-controller.service';

@Component({
  selector: 'app-filter-helper',
  templateUrl: './filter-helper.component.html',
  styleUrls: ['./filter-helper.component.scss']
})
export class FilterHelperComponent implements OnInit {
  @Input() filterString: string = "";
  @Output() filterStringChange: EventEmitter<string> = new EventEmitter();
  @Input() whereFilter: any = {};
  @Output() whereFilterChange: EventEmitter<string> = new EventEmitter();
  fieldList: any = {
    ofnr: {fieldName: "ofnr", label: "Numéro d'OF", placeholder: "", ariaLabel: "", autocompleteName: "", db: "_of", control: new FormControl(), minLength: 3}, 
    alea: {fieldName: "alea", label: "Aléa", placeholder: "", ariaLabel: "", autocompleteName: "", db: "_alea", control: new FormControl(), minLength: 0}, 
    status: {fieldName: "status", label: "Etat", placeholder: "", ariaLabel: "", autocompleteName: "", db: "_status", control: new FormControl(), minLength: 0}, 
    operation: {fieldName: "operation", label: "Opération", placeholder: "", ariaLabel: "", autocompleteName: "", db: "_operation", control: new FormControl(), minLength: 0}, 
    localization: {fieldName: "name", label: "Atelier", placeholder: "", ariaLabel: "", autocompleteName: "", db: "_workshop", control: new FormControl(), minLength: 0},
    codem: {fieldName: "codem", label: "Code machine", placeholder: "", ariaLabel: "", autocompleteName: "", db: "_workstation", control: new FormControl(), minLength: 0}, 
    timestamp: {fieldName: "timestamp", label: "Horodatage API", placeholder: "", ariaLabel: "", autocompleteName: "", db: "", control: new FormControl(), minLength: 0}
  };

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  get _string(): string {
    return this.filterString;
  }
  set _string(val: string) {
    this.filterString = val;
    this.filterStringChange.emit(this.filterString);
  }
  constructor(
    private _adf: AngularDataFilterControllerService,
    private _of: FabricationOrderControllerService,
    private _alea: MessageStandardControllerService,
    private _status: MessageStatusControllerService,
    private _operation: OperationControllerService,
    private _workshop: WorkshopControllerService,
    private _workstation: WorkstationControllerService
  ) { }

  ngOnInit() {
    for (let key of Object.keys(this.fieldList)) {
      if (!this.fieldList[key].db || this.fieldList[key].db.length <= 0) continue;
      this.fieldList[key].filteredOptions = this.fieldList[key].control.valueChanges
      .pipe(
        startWith(''),
        filter((value: string) => value.length >= this.fieldList[key].minLength),
        concatMap((value: string) => this._getValues(value, key)),
        map((value: any) => value.map((v: any) => v[this.fieldList[key].fieldName]))
      )
    }
  }

  _getValues(value: string, key: string): string {
    const autocompleteFilter = {
      filter: JSON.stringify({
        fields: {[this.fieldList[key].fieldName]: true},
        where: {
          [this.fieldList[key].fieldName]: {
            like: `%${value}%`
          }
        }
      })
    }
    return this[this.fieldList[key].db].find(autocompleteFilter);
  }

}
