import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Shift, ShiftSchedule } from 'src/app/api/models';
import { ShiftControllerService } from 'src/app/api/services';
import { ShiftScheduleControllerService } from 'src/app/api/services';
import { ShiftModelBottomsheetEditorComponent } from '../shift-model-bottomsheet-editor/shift-model-bottomsheet-editor.component';

@Component({
  selector: 'app-shift-editor',
  templateUrl: './shift-editor.component.html',
  styleUrls: ['./shift-editor.component.scss']
})
export class ShiftEditorComponent implements OnInit {
  shifts: Shift[] = [];
  schedules: ShiftSchedule[] = [];
  shiftTableColumns: string[] = ['name', 'description', 'buttons'];

  constructor(
    private _shifts: ShiftControllerService,
    private _shiftSchedules: ShiftScheduleControllerService,
    private _bottomSheet: MatBottomSheet,
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  async refresh() {
    try {
      this.shifts = await this._shifts.find().toPromise();
      this.schedules = await this._shiftSchedules.find().toPromise();
    } catch (e) {
      console.log(e);
    }
  }

  addShift(event) {
    const createBottomSheet = this._bottomSheet.open(ShiftModelBottomsheetEditorComponent, {
      data: event
    });
    createBottomSheet.afterDismissed().subscribe(
      data => {},
      err => console.log(err),
      () => this.refresh()
    )
  }

  edit(event) {
    console.log('edit', event);
  }
  clear(event) {
    console.log('clear', event);
  }
  copy(event) {
    console.log('copy', event);
  }

}
