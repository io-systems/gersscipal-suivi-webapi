import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-shift-model-bottomsheet-editor',
  templateUrl: './shift-model-bottomsheet-editor.component.html',
  styleUrls: ['./shift-model-bottomsheet-editor.component.scss']
})
export class ShiftModelBottomsheetEditorComponent {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<ShiftModelBottomsheetEditorComponent>
  ) {
    console.log(this.data);
  }

  processResult(result: boolean) {
    this._bottomSheetRef.dismiss();
  }
}
