import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Workshop } from '../../api/models/workshop';

@Component({
  selector: 'app-workshop-bottomsheet-editor',
  templateUrl: './workshop-bottomsheet-editor.component.html',
  styleUrls: ['./workshop-bottomsheet-editor.component.scss']
})
export class WorkshopBottomsheetEditorComponent {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Workshop,
    private _bottomSheetRef: MatBottomSheetRef<WorkshopBottomsheetEditorComponent>
  ) { }

  processResult(result: boolean = false): void {
    this._bottomSheetRef.dismiss();
  }

}
