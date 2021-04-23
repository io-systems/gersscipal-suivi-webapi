import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MessageStandard } from '../../api/models/message-standard';

@Component({
  selector: 'app-message-standard-bottomsheet-editor',
  templateUrl: './message-standard-bottomsheet-editor.component.html',
  styleUrls: ['./message-standard-bottomsheet-editor.component.scss']
})
export class MessageStandardBottomsheetEditorComponent {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: MessageStandard,
    private _bottomSheetRef: MatBottomSheetRef<MessageStandardBottomsheetEditorComponent>
  ) { }

  processResult(result: boolean = false): void {
    this._bottomSheetRef.dismiss();
  }


}
