import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProgressBarService } from 'src/app/progress-bar.service';
import { Shift } from 'src/app/api/models';
import { ShiftControllerService, ShiftScheduleControllerService } from 'src/app/api/services';
import { ShiftModelBottomsheetEditorComponent } from '../shift-model-bottomsheet-editor/shift-model-bottomsheet-editor.component';

@Component({
  selector: 'app-shift-editor',
  templateUrl: './shift-editor.component.html',
  styleUrls: ['./shift-editor.component.scss']
})
export class ShiftEditorComponent implements OnInit {
  shifts: Shift[] = [];
  shiftTableColumns: string[] = ['name', 'description', 'buttons'];
  selectedShift: Shift = {
    name: '',
    description: '',
  }

  constructor(
    private _shifts: ShiftControllerService,
    private _schedules: ShiftScheduleControllerService,
    private _bottomSheet: MatBottomSheet,
    private _progress: ProgressBarService,
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  async refresh() {
    this._progress.setLoadingState(true);
    try {
      this.shifts = await this._shifts.find().toPromise();
      if (this.selectedShift.name === '') {
        this.selectedShift = this.shifts[0] || {
            name: '',
            description: '',
          };
      }
    } catch (e) {
      console.log(e);
    }
    this._progress.setLoadingState(false);
  }

  addShift(shift) {
    const createBottomSheet = this._bottomSheet.open(ShiftModelBottomsheetEditorComponent, {
      data: shift
    });
    createBottomSheet.afterDismissed().subscribe(
      data => {},
      err => console.log(err),
      () => this.refresh()
    )
  }

  edit(event, elm) {
    event.stopPropagation();
    this.selectedShift = elm;
    this.addShift(this.selectedShift);
  }
  async clear(event, elm) {
    console.log('clear', elm);
    event.stopPropagation();
    if (confirm(`Voulez-vous vraiment supprimer la plage horaire ${elm.name} ?`)) {
      try {
        // suppression des schedules
        //this._schedules
      } catch (e) {
        console.log(e);
      }
    }
  }
  selectShift(event, elm: Shift) {
    event.stopPropagation();
    this.selectedShift = elm;
  }

}
