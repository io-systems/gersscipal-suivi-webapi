import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  public where: Subject<any> = new Subject();
  private _where: any;

  constructor() { }

  updateWhere(fil: any = {}) {
    this._where = fil;
    this.where.next(this._where);
  }

}
