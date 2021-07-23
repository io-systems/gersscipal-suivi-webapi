import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ConfigService } from 'src/app/config.service';
import { ProgressBarService } from 'src/app/progress-bar.service';
import { Shift, ShiftSchedule } from 'src/app/api/models';
import { ShiftScheduleControllerService } from 'src/app/api/services';
import { OpeningTimePeriodBottomsheetEditorComponent } from '../opening-time-period-bottomsheet-editor/opening-time-period-bottomsheet-editor.component';

@Component({
  selector: 'app-shift-schedule-editor',
  templateUrl: './shift-schedule-editor.component.html',
  styleUrls: ['./shift-schedule-editor.component.scss']
})
export class ShiftScheduleEditorComponent implements OnInit, OnChanges {
  @Input() shift: Shift = {
    name: '',
    description: '',
  };
  shiftSchedules: ShiftSchedule[] = [];
  tableColumns: string[] = ['start', 'end'];

  constructor(
    private db: ShiftScheduleControllerService,
    private _bottomSheet: MatBottomSheet,
    private _config: ConfigService,
    private _progress: ProgressBarService,
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  ngOnChanges(s: SimpleChanges) {
    if (s.hasOwnProperty('shift')) {
      this.refresh();
    }
  }

  async refresh() {
    this._progress.setLoadingState(true);
    try {
      if (this.shift && this.shift.name) {
        this.shiftSchedules = await this.db.find({
          filter: JSON.stringify({
            where: {
              shift: this.shift.name
            }
          })
        }).toPromise();
      }
    } catch (e) {
      console.log(e);
    }
    this._progress.setLoadingState(false);
  }

  async updateDB() {
    try{
      for (let sched of this.shiftSchedules) {
        await this.db.create({body: sched}).toPromise();
      }
    } catch (e) {
      console.log(e);
    }
    this.refresh();
  }

  async addToDB(data) {
    try {
      for (let sched of this.shiftSchedules) {
        if (sched && sched.id) {
          await this.db.deleteById({id: sched.id}).toPromise();
        }
      }
      this.shiftSchedules = [];
      for (let period of data.periods) {
        this.shiftSchedules.push({
          shift: data.shift.name,
          day: data.day,
          weekDay: data.weekDay,
          start: period.start,
          end: period.end
        });
      }
      this.updateDB()
    } catch (e) {
      console.log(e);
    }
  }

  addPeriod() {
    const createBottomSheet = this._bottomSheet.open(OpeningTimePeriodBottomsheetEditorComponent, {
      data: {
        day: '',
        weekDay: 0,
        periods: [],
        shift: this.shift
      }
    });
    createBottomSheet.afterDismissed().subscribe(
      data => this.addToDB(data),
      err => console.log(err),
      () => {} // this.refresh()
    )
  }

  editPeriod() {
    const createBottomSheet = this._bottomSheet.open(OpeningTimePeriodBottomsheetEditorComponent, {
      data: {
        day: '',
        weekDay: 0,
        periods: this.shiftSchedules,
        shift: this.shift
      }
    });
    createBottomSheet.afterDismissed().subscribe(
      data => this.addToDB(data),
      err => console.log(err),
      () => {} // this.refresh()
    )
  }

}
