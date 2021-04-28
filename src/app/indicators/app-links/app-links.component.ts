import { Component } from '@angular/core';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'app-links',
  templateUrl: './app-links.component.html',
  styleUrls: ['./app-links.component.scss']
})
export class AppLinksComponent {
  apps: any[] = [];

  constructor(
    private _config: ConfigService
  ) {
    this.apps = _config.APP_LINKS;
  }

}
