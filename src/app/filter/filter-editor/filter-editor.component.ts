import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FilterService } from '../filter.service';
import { FilterHelperDialogComponent } from '../filter-helper-dialog/filter-helper-dialog.component';

@Component({
  selector: 'app-filter-editor',
  templateUrl: './filter-editor.component.html',
  styleUrls: ['./filter-editor.component.scss']
})
export class FilterEditorComponent {
  filterString: string = "";
  storedFilters: any[] = [];
  filterDB: Subscription;
  _where: any = {};
  get where(): any {
    return this._where;
  }
  set where(val: any) {
    this._where = val;
    this._filter.updateWhere(this._where);
  }
  isRecordable(): boolean {
    return this._where && Object.keys(this._where).length > 0;
  }
  getCurrentFilterIndex(): number {
    return this.storedFilters.findIndex((fil: any) => fil.content === this.filterString);
  }
  isStored(): boolean {
    return this.getCurrentFilterIndex() > -1;
  }

  preventDefault(event): void {
    event.stopPropagation();
  }

  constructor(
    private _filter: FilterService,
    public _dialog: MatDialog
  ) {
    this.filterDB = this._filter.filters.subscribe(
      data => this.storedFilters  = (data && data.content) ? data.content || [] : []
    );
  }

  ngOnDestroy(): void {
    if (this.filterDB) this.filterDB.unsubscribe();
  }

  // FILTER HELPER MANAGEMENT
  openHelper(): void {
    const dialogRef = this._dialog.open(FilterHelperDialogComponent, {
      data: {filterString: this.filterString, whereFilter: this.where}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // console.log(result);
    });
  }
  
  // STORED FILTERS MANAGEMENT
  saveFilter(): void {
    if (Object.keys(this._where).length <= 0) return;
    const filterName = prompt("Quel est le nom de ce filtre ?", "");
    if (filterName && filterName.length > 0) {
      this._filter.saveFilter(filterName, this.filterString);
    }
  }
  selectFilter(event: any): void {
    if (!event || !event.value || !event.value.content || event.value.content.length <= 0) return;
    this.filterString = event.value.content;
    this.updateFilter();
  }
  deleteFilter(): void {
    if (!this.isStored()) return;
    this._filter.deleteFilter(this.storedFilters[this.getCurrentFilterIndex()].name);
  }

  // EDIT FILTER MANAGEMENT
  resetFilter() {
    this.filterString = "";
    this.updateFilter();
  }
  filterChange(event: any) {
    this.preventDefault(event);
    this.updateFilter();
  }

  // PARSE FILTER
  updateFilter() {
    let tmp: any;
    const filters = this.filterString.split(";").map(fil => fil.trim());
    if (filters.length < 2) {
      tmp = this.parseFilter(filters[0]);
    }else{
      tmp = {and: []};
      tmp.and = filters.map(fil => this.parseFilter(fil)).filter(fil => Object.keys(fil).length > 0);
      if (tmp.and.length < 2) tmp = tmp.and[0];
    }
    this.where = tmp;
  }
  checkFilter(stringValue: string = ""): boolean {
    const field = stringValue.split(":");
    return field.length > 1 && field.length <= 2 && field[1].length > 2
  }
  parseFilter(stringValue: string = ""): any {
    let tmp: any;
    if (!this.checkFilter(stringValue)) return {};
    const values = stringValue.split(":").map(val => val.trim()).filter(val => val.length > 2);
    if (values.length < 2) return {};
    const field = values[0];
    const filters = values[1].split(",").map(fil => fil.trim());
    switch(field.toUpperCase()) {
      case 'DAY':
      case 'DATE':
      case 'JOUR':
      case 'HEURE':
      case 'HOUR':
      case 'PERIOD':
      case 'PÉRIODE':
      case 'PERIODE':
        const _period = this.getPeriod(filters);
        if (!_period) return;
        const _periodJSON = _period.map((per: string) => new Date(per).toJSON())
        tmp = {"timestamp": {between: _periodJSON}};
        break;
      
      case 'CREATEDAT':
      case 'UPDATEDAT':
        const _periodAt = this.getPeriod(filters);
        if (!_period) return;
        const _periodJSONAt = _periodAt.map((per: string) => new Date(per).toJSON())
        tmp = {[field]: {between: _periodJSONAt}};
        break;

      default:
        if (filters.length < 2) {
          tmp = {};
          tmp[field] = {like: (filters[0].includes('%')) ? filters[0] : `%${filters[0]}%`};
        }else{
          tmp = {
            or: filters.filter((val: string) => val.length > 2)
            .map((val: string) => ({ [field]: {like: (val.includes('%')) ? val : `%${val}%`}}))
          };
          if (tmp.or && tmp.or.length < 2) tmp = tmp.or[0];
        }
        break;
    }
    return tmp;
  }
  parseDate(dateString: string = ""): string | boolean {
    const _day = dateString.split("/");
    if (_day.length === 1) {
      // traitement d'un mot : today ou hier
      let _dateLookedUp: Date;
      switch(dateString.toUpperCase()) {
        case "AUJOURD'HUI":
        case "AUJOURDHUI":
        case 'TODAY':
          _dateLookedUp  =new Date();
          break;
        
        case "HIER":
        case "YESTERDAY":
          _dateLookedUp  =new Date();
          _dateLookedUp.setDate(_dateLookedUp.getDate() - 1);
          break;

        default: 
          return false;
      }
      return _dateLookedUp.toJSON().split("T")[0];
    }
    if (_day.length < 3 || _day[0].length < 2 || _day[1].length < 2 || _day[2].length < 4) return false;
    const _dayReversed = [
      _day[2],
      _day[1],
      _day[0]
    ]
    return _dayReversed.join("-");
  }
  parseTime(hourString: string = ""): string | boolean {
    const _hours = hourString.split("-");
    if (_hours.length < 3 || _hours[0].length < 2 || _hours[1].length < 2 || _hours[2].length < 2) return false;
    return _hours.join(":");
  }
  parseUserTimestamp(dateString: string = ""): any | boolean {
    // on reçoit ici en paramètre : 
    // soit une date JJ/MM/AAAA
    // soit un horodatage JJ/MM/AAAA HH-MM-SS
    // soit un mot : 'today', 'hier' ?
    const _timestampFields = dateString.split(" ").map(val => val.trim()).filter(val => val.length === 8 || val.length === 10);
    let _parsedDate: string | boolean = false;
    let _parsedTime: string | boolean = false;
    if (_timestampFields.length > 2) return false;
    _parsedDate = this.parseDate(_timestampFields[0]);
    if (_timestampFields.length > 1) _parsedTime = this.parseTime(_timestampFields[1]);
    if (!_parsedDate) return false;
    return {
      date: _parsedDate,
      time: _parsedTime
    }
  }
  getPeriod(dateStrings: string[]): any | boolean {
    // on reçoit ici directement la valeur de filtrage : date seule ou période
    // [jour | date début de période: date | date et heure, date fin de pédiore: date | date et heure]
    let tmp = [];
    let _timestampStart: any | boolean;
    let _timestampEnd: any | boolean;
    if (dateStrings.length > 0) _timestampStart = this.parseUserTimestamp(dateStrings[0]);
    if (dateStrings.length > 1) _timestampEnd = this.parseUserTimestamp(dateStrings[1]);
    // aucun des deux horodatages ne sont corrects
    if (!_timestampStart) return false;
    if (!_timestampEnd) {
      // seul le premier champ de début de période est correctement lu
      if (_timestampStart.time) {
        tmp.push(`${_timestampStart.date} ${_timestampStart.time}`);
        tmp.push(`${_timestampStart.date} 23:59:59`);
      }else{
        tmp.push(`${_timestampStart.date} 00:00:00`);
        tmp.push(`${_timestampStart.date} 23:59:59`);
      }
    }else{
      // les deux champs de début et de fin de période on été correctement lus
      if (_timestampStart.time) {
        if (_timestampEnd.time) {
          tmp.push(`${_timestampStart.date} ${_timestampStart.time}`);
          tmp.push(`${_timestampEnd.date} ${_timestampEnd.time}`);
        }else{
          tmp.push(`${_timestampStart.date} ${_timestampStart.time}`);
          tmp.push(`${_timestampEnd.date} 23:59:59`);
        }
      }else{
        if (_timestampEnd.time) {
          tmp.push(`${_timestampStart.date} 00:00:00`);
          tmp.push(`${_timestampEnd.date} ${_timestampEnd.time}`);
        }else{
          tmp.push(`${_timestampStart.date} 00:00:00`);
          tmp.push(`${_timestampEnd.date} 23:59:59`);
        }
      }
    }
    return tmp;
  }

}
