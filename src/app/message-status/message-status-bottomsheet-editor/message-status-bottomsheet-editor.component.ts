import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MessageStatus } from '../../api/models/message-status';

@Component({
  selector: 'app-message-status-bottomsheet-editor',
  templateUrl: './message-status-bottomsheet-editor.component.html',
  styleUrls: ['./message-status-bottomsheet-editor.component.scss']
})
export class MessageStatusBottomsheetEditorComponent {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: MessageStatus,
    private _bottomSheetRef: MatBottomSheetRef<MessageStatusBottomsheetEditorComponent>
  ) { }

  processResult(result: boolean = false): void {
    this._bottomSheetRef.dismiss();
  }

}
