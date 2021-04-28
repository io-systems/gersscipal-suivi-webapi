import { Component } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-mit-licence',
  templateUrl: './mit-licence.component.html',
  styleUrls: ['./mit-licence.component.scss']
})
export class MitLicenceComponent {
  copyrightYears: string = "2021";

  constructor(
    private config: ConfigService
  ) {
    this.copyrightYears = this.config.getCopyrightYears();
  }

}
