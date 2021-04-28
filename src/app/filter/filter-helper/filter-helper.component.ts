import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  get _string(): string {
    return this.filterString;
  }
  set _string(val: string) {
    this.filterString = val;
    this.filterStringChange.emit(this.filterString);
  }
  get _where(): any {
    return this._where;
  }
  set _where(val: any) {
    this.whereFilter = val;
    this.whereFilterChange.emit(this.whereFilter);
  }
  constructor() { }

  ngOnInit() { }

}
