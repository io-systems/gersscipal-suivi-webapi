import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-opening-time-period-editor',
  templateUrl: './opening-time-period-editor.component.html',
  styleUrls: ['./opening-time-period-editor.component.scss']
})
export class OpeningTimePeriodEditorComponent implements OnInit {
  timePeriodForm: FormGroup;
  fieldDesignationMaxLength: number = 32;
  @Input() timePeriod: any;
  @Output() result: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.timePeriodForm = this.formBuilder.group({
      // designation: new FormControl('', [
      //   Validators.maxLength(this.fieldDesignationMaxLength)
      // ]),
      start: new FormControl('', [
        Validators.required
      ]),
      end: new FormControl('', [
        Validators.required
      ])
    });
  }

  addPeriod(): void {
    const tmp = {
      // designation: this.timePeriodForm.controls.designation.value,
      start: this.timePeriodForm.controls.start.value,
      end: this.timePeriodForm.controls.end.value
    }
    this.timePeriod.periods.push(tmp);
    this.timePeriod.periods.sort((a: any, b: any) => {
      const at = new Date(Date.parse(`1970-01-01 ${a.start}:00`));
      const bt = new Date(Date.parse(`1970-01-01 ${b.start}:00`));
      return at.valueOf() - bt.valueOf();
    });
  }
  clearPeriod(i: number): void {
    if (i < 0 || i >= this.timePeriod.periods.length ||!this.timePeriod.periods[i]) return;
    this.timePeriod.periods.splice(i, 1);
  }

}
