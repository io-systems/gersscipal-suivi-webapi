import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Workstation } from '../../api/models/workstation';

@Component({
  selector: 'app-workstation-bottomsheet-editor',
  templateUrl: './workstation-bottomsheet-editor.component.html',
  styleUrls: ['./workstation-bottomsheet-editor.component.scss']
})
export class WorkstationBottomsheetEditorComponent {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Workstation,
    private _bottomSheetRef: MatBottomSheetRef<WorkstationBottomsheetEditorComponent>
  ) { }

  processResult(result: boolean = false): void {
    this._bottomSheetRef.dismiss();
  }

}
