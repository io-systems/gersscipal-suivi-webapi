import { Component } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GSP - Suivi de production';
  sideNavOpened = true;
  
  constructor(
    public mediaObserver: MediaObserver
  ) {
    mediaObserver.asObservable().subscribe(data => {
      this.sideNavOpened = !mediaObserver.isActive('xs');
    });
  }
}
