import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MessageHistory } from '../../api/models/message-history';

@Component({
  selector: 'app-message-history-bottomsheet-editor',
  templateUrl: './message-history-bottomsheet-editor.component.html',
  styleUrls: ['./message-history-bottomsheet-editor.component.scss']
})
export class MessageHistoryBottomsheetEditorComponent {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: MessageHistory,
    private _bottomSheetRef: MatBottomSheetRef<MessageHistoryBottomsheetEditorComponent>
  ) { }

  processResult(result: boolean = false): void {
    this._bottomSheetRef.dismiss();
  }

}
