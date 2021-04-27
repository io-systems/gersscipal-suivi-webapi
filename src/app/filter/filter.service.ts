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
  private _storedFilters: any = {};

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
    this.updateFilters();
  }
  async updateFilters() {
    this._storedFilters = await this.db.get({hash: this._userHash}).toPromise();
    this._storedFilters = JSON.parse(this._storedFilters);
    this.filters.next(this._storedFilters);
  }

  updateWhere(fil: any = {}): void {
    this._where = fil;
    this.where.next(this._where);
  }

  async saveFilter(filterName: string, filterContent: string) {
    await this.db.create({
      hash: this._userHash,
      body: {
        name: filterName,
        content: filterContent
      }
    }).toPromise();
    this.updateFilters();
  }
  async deleteFilter(filterName: string) {
    await this.db.deleteFilter({
      hash: this._userHash,
      name: filterName
    }).toPromise();
    this.updateFilters();
  }

}
