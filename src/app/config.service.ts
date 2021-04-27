import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public REQUEST_LIMIT = 25;
  public PROGRESS_TIMEOUT_TIME = 1600;

  constructor() { }

}
