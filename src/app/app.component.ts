import { Component } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ConfigService } from './config.service';
import { ApiConfiguration } from './api/api-configuration';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GSP - Suivi de production';
  sideNavOpened = true;
  copyrightYears: string = "";
  
  constructor(
    public mediaObserver: MediaObserver,
    private config: ConfigService,
    private apiConfig: ApiConfiguration
  ) {
    mediaObserver.asObservable().subscribe(data => {
      this.sideNavOpened = !mediaObserver.isActive('lt-sm');
    });
    this.copyrightYears = this.config.getCopyrightYears();
    this.apiConfig.rootUrl = [
      window.location.protocol,
      "//",
      window.location.hostname,
      ':',
      (window.location.port === "4200") ? "3000" : window.location.port
    ].join("");
  }
}
