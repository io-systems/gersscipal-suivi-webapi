import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  public loading: Subject<boolean> = new Subject();

  constructor() { }

  toggleLoadingState() {
    this.loading.next();
  }
  setLoadingState(value: boolean): void {
    this.loading.next(value);
  }

}
