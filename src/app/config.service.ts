import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public REQUEST_LIMIT: number = 25;
  public PROGRESS_TIMEOUT_TIME: number = 1600;
  public APP_CREATION_YEAR: number = 2021;
  public APP_LINKS: any[] = [
    {
      app: "Application Node-RED",
      icon: "assets/img/node-red-hexagon.svg",
      href: "http://192.168.1.230:1880",
      target: "_blank"
    },
    {
      app: "Application Grafana",
      icon: "assets/img/grafana.png",
      href: "http://192.168.1.230:4000",
      target: "_blank"
    },
    {
      app: "iotdb explorer",
      icon: "assets/img/loopback.svg",
      href: "http://192.168.1.230:3000/explorer",
      target: "_blank"
    }
  ]

  constructor() { }

  getCopyrightYears() {
    const yearNow = new Date().getFullYear();
    return (yearNow !== this.APP_CREATION_YEAR) ? `${this.APP_CREATION_YEAR} - ${yearNow}` : `${this.APP_CREATION_YEAR}`;
  }

}
