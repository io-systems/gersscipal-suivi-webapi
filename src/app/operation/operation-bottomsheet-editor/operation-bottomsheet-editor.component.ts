import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Workshop } from '../../api/models/workshop';

@Component({
  selector: 'app-operation-bottomsheet-editor',
  templateUrl: './operation-bottomsheet-editor.component.html',
  styleUrls: ['./operation-bottomsheet-editor.component.scss']
})
export class OperationBottomsheetEditorComponent {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Workshop,
    private _bottomSheetRef: MatBottomSheetRef<OperationBottomsheetEditorComponent>
  ) { }

  processResult(result: boolean = false): void {
    this._bottomSheetRef.dismiss();
  }

}
