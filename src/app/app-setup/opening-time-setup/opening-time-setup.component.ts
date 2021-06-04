import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AppSetupControllerService } from '../../api/services';
import { OpeningTimePeriodBottomsheetEditorComponent } from '../opening-time-period-bottomsheet-editor/opening-time-period-bottomsheet-editor.component';


@Component({
  selector: 'app-opening-time-setup',
  templateUrl: './opening-time-setup.component.html',
  styleUrls: ['./opening-time-setup.component.scss']
})
export class OpeningTimeSetupComponent implements OnInit {
  setup: any = {
    key: "opening-time-setup",
    value: {
      models: [],
      week: [
        {
          day: "Lundi",
          weekDay: 1,
          periods: []
        },
        {
          day: "Mardi",
          weekDay: 2,
          periods: []
        },
        {
          day: "Mercredi",
          weekDay: 3,
          periods: []
        },
        {
          day: "Jeudi",
          weekDay: 4,
          periods: []
        },
        {
          day: "Vendredi",
          weekDay: 5,
          periods: []
        },
        {
          day: "Samedi",
          weekDay: 6,
          periods: []
        },
        {
          day: "Dimanche",
          weekDay: 0,
          periods: []
        },
      ]
    }
    
  }

  constructor(
    private db: AppSetupControllerService,
    private _bottomSheet: MatBottomSheet,
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  async refresh(): Promise<void> {
    const tmp: any = await this.db.getKey({key: this.setup.key}).toPromise();
    if (!tmp || !tmp.value || !tmp.value.week || !Array.isArray(tmp.value.week) || tmp.value.week.length <= 0) return;
    this.setup = tmp;
  }

  async updateDB(): Promise<void> {
    await this.db.createKey({key: this.setup.key, body: this.setup}).toPromise();
  }

  editPeriod(event) {
    const createBottomSheet = this._bottomSheet.open(OpeningTimePeriodBottomsheetEditorComponent, {
      data: event
    });
    createBottomSheet.afterDismissed().subscribe(
      data => {},
      err => console.log(err),
      () => this.updateDB()
    )
  }

}
