import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ConfigService } from '../../config.service';

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

  constructor(
    private appConfig: ConfigService
  ) {
    this.showProgress();
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
    this.mode = "query";
    if (this.toutReset) clearTimeout(this.toutReset);
    this.toutReset = setTimeout(() => {
      this.recheckLoadingStatus();
    }, this.appConfig.PROGRESS_TIMEOUT_TIME || 2000);
  }
  hideProgress(): void {
    this.value = 0;
    this.mode = "determinate";
  }

}
