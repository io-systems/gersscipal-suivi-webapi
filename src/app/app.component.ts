import { Component } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ConfigService } from './config.service';

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
    private config: ConfigService
  ) {
    mediaObserver.asObservable().subscribe(data => {
      this.sideNavOpened = !mediaObserver.isActive('lt-sm');
    });
    this.copyrightYears = this.config.getCopyrightYears();
  }
}
