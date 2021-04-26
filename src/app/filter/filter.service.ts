import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import * as shajs from 'sha.js';
import { AngularDataFilterControllerService } from '../api/services/angular-data-filter-controller.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  public where: Subject<any> = new Subject();
  public filters: ReplaySubject<any> = new ReplaySubject();
  private _where: any;
  private _userHash: string;
  private _filters: any = {};

  constructor(
    private db: AngularDataFilterControllerService
  ) {
    const browserInfo = [
      navigator.appName, 
      navigator.appVersion, 
      navigator.appCodeName, 
      navigator.product, 
      navigator.productSub, 
      navigator.userAgent, 
      navigator.vendor, 
      navigator.vendorSub
    ].join(",");
    this._userHash = new shajs.sha256().update(browserInfo).digest('hex');
  }
  async updateFilters() {
    this._filters = await this.db.get({hash: this._userHash}).toPromise();
    this.filters.next(this._filters);
  }

  updateWhere(fil: any = {}) {
    this._where = fil;
    this.where.next(this._where);
  }

}
