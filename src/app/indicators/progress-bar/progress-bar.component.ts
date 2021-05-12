import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfigService } from '../../config.service';
import { ProgressBarService } from '../../progress-bar.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnChanges {
  value: number = 0;
  mode: string = "determinate";
  toutReset;
  @Input() loading: boolean = false;
  show: boolean = false;
  ls: Subscription;

  constructor(
    private appConfig: ConfigService,
    private _progressBar: ProgressBarService
  ) {
    this.showProgress();
    this.ls = this._progressBar.loading.subscribe(
      data => {
        this.loading = data;
        this.checkLoadingStatus();
      }
    );
  }
  ngOnDestroy() {
    if (this.ls) this.ls.unsubscribe();
  }

  ngOnChanges(s: SimpleChanges) {
    this.checkLoadingStatus();
  }
  
  checkLoadingStatus(): void {
    if (this.loading) {
      this.showProgress();
    }
  }
  recheckLoadingStatus(): void {
    if (this.loading) {
      this.showProgress();
    }else{
      this.hideProgress();
    }
  }
  showProgress(): void {
    this.show = true;
    this.mode = "query";
    if (this.toutReset) clearTimeout(this.toutReset);
    this.toutReset = setTimeout(() => {
      this.recheckLoadingStatus();
    }, this.appConfig.PROGRESS_TIMEOUT_TIME || 2000);
  }
  hideProgress(): void {
    this.show = false;
    this.value = 0;
    this.mode = "determinate";
  }

}
