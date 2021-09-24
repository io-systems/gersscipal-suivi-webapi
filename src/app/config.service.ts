import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public APP_NAME = 'Gers Sci Pal';
  public APP_NICKNAME = 'GSP';
  public REQUEST_LIMIT: number = 25;
  public PROGRESS_TIMEOUT_TIME: number = 1600;
  public SNACKBAR_TIMEOUT_TIME: number = 1600;
  public APP_CREATION_YEAR: number = 2021;
  public APP_LINKS: any[] = [
    {
      app: "Application Node-RED",
      icon: "assets/img/node-red-hexagon.svg",
      href: "",
      port: "1880",
      pathname: "",
      target: "_blank"
    },
    {
      app: "Application Grafana",
      icon: "assets/img/grafana.png",
      href: "",
      port: "4000",
      pathname: "",
      target: "_blank"
    },
    {
      app: "iotdb explorer",
      icon: "assets/img/loopback.svg",
      href: "",
      port: "3000",
      pathname: "/explorer",
      target: "_blank"
    }
  ]
  public PLC_ADDRESSES: string[] = [
    "%IX0.0",
    "%IX0.1",
    "%IX0.2",
    "%IX0.3",
    "%IX0.4",
    "%IX0.5",
    "%IX0.6",
    "%IX0.7",
    "%IX1.0",
    "%IX1.1",
    "%IX1.2",
    "%IX1.3",
    "%IX1.4",
    "%IX1.5",
    "%IX1.6",
    "%IX1.7",
    "ihmButton[0]",
    "ihmButton[1]",
    "ihmButton[2]",
    "ihmButton[3]",
    "ihmButton[4]",
    "ihmButton[5]",
    "ihmButton[6]",
    "ihmButton[7]",
    "ihmButton[8]",
    "ihmButton[9]",
    "ihmButton[10]",
    "ihmButton[11]",
    "ihmButton[12]",
    "ihmButton[13]",
    "ihmButton[14]",
    "ihmButton[15]"
  ];

  constructor() {
    this.APP_LINKS.forEach(link => {
      link.href = [
        window.location.protocol,
        "//",
        window.location.hostname,
        ":",
        link.port,
        link.pathname
      ].join("");
    });
  }

  getCopyrightYears() {
    const yearNow = new Date().getFullYear();
    return (yearNow !== this.APP_CREATION_YEAR) ? `${this.APP_CREATION_YEAR} - ${yearNow}` : `${this.APP_CREATION_YEAR}`;
  }

}
