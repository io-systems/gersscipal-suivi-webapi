import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FabricationOrder } from '../../api/models/fabrication-order';

@Component({
  selector: 'app-fabrication-order-bottomsheet-editor',
  templateUrl: './fabrication-order-bottomsheet-editor.component.html',
  styleUrls: ['./fabrication-order-bottomsheet-editor.component.scss']
})
export class FabricationOrderBottomsheetEditorComponent {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: FabricationOrder,
    private _bottomSheetRef: MatBottomSheetRef<FabricationOrderBottomsheetEditorComponent>
  ) { }

  processResult(result: boolean = false): void {
    this._bottomSheetRef.dismiss();
  }

}
