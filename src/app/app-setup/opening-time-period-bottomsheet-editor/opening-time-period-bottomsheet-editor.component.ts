import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-opening-time-period-bottomsheet-editor',
  templateUrl: './opening-time-period-bottomsheet-editor.component.html',
  styleUrls: ['./opening-time-period-bottomsheet-editor.component.scss']
})
export class OpeningTimePeriodBottomsheetEditorComponent {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<OpeningTimePeriodBottomsheetEditorComponent>
  ) {
    this._bottomSheetRef.backdropClick().subscribe(
      (event) => {
        event.stopPropagation();
        this._bottomSheetRef.dismiss(this.data);
      }
    )
  }

  processResult(result: boolean = false): void {
    this._bottomSheetRef.dismiss(this.data);
  }

}
