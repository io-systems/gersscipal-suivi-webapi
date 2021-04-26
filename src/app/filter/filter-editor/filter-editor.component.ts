import { Component, OnInit } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { filter } from 'rxjs/operators';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-filter-editor',
  templateUrl: './filter-editor.component.html',
  styleUrls: ['./filter-editor.component.scss']
})
export class FilterEditorComponent implements OnInit {
  filterString: string = "";
  _where: any = {};
  get where(): any {
    return this._where;
  }
  set where(val: any) {
    this._where = val;
    this._filter.updateWhere(this._where);
  }

  constructor(
    private _filter: FilterService
  ) { }

  ngOnInit(): void {
  }

  resetFilter() {
    this.filterString = "";
    this.updateFilter();
  }
  filterChange(event) {
    this.updateFilter();
  }

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
    let tmp = {};
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
        tmp = {or: [
          {"timestamp": {between: _periodJSON}},
          {"createdAt": {between: _periodJSON}},
          {"updatedAt": {between: _periodJSON}}
        ]};
        break;

      default:
        if (filters.length < 2) {
          tmp[field] = {like: (filters[0].includes('%')) ? filters[0] : `%${filters[0]}%`};
        }else{
          tmp[field] = {or: []};
          tmp[field].or = filters.map(val => ({like: (val.includes('%')) ? val : `%${val}%`}));
        }
        if (tmp[field].or && tmp[field].or.length < 2) tmp[field] = tmp[field].or[0];
    }
    return tmp;
  }
  parseDate(dateString: string = ""): string | boolean {
    const _day = dateString.split("/");
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
    // on reçoit ici en paramètre : soit une date JJ/MM/AAAA
    // soit un horodatage JJ/MM/AAAA HH-MM-SS
    // option : {mode: number} = traitement de l'heure si non renseignée dans l'horodatage fourni en paramètre
    // mode = 1 : début de journée (par défaut)
    // mode = 2 : fin de journée
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
