import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MessageStatus } from '../../api/models/message-status';
import { MessageStatusControllerService } from '../../api/services/message-status-controller.service';

@Component({
  selector: 'app-message-status-selector',
  templateUrl: './message-status-selector.component.html',
  styleUrls: ['./message-status-selector.component.scss']
})
export class MessageStatusSelectorComponent implements OnInit {
  messagesStatuses: MessageStatus[] = []
  @Input() selectedMessageStatus: MessageStatus;
  @Input() selectedMessageStatusValue: number;
  @Output() setMessageStatus: EventEmitter<MessageStatus> = new EventEmitter();
  @Output() setMessageStatusValue: EventEmitter<MessageStatus> = new EventEmitter();
  selected = 0;

  constructor(
    private db: MessageStatusControllerService
  ) { }

  ngOnInit(): void {
    this.refreshmessagesStatuses();
  }
  ngOnChanges(s: SimpleChanges) {
    if (s.hasOwnProperty("selectedMessageStatus")) this.updateSelected();
    if (s.hasOwnProperty("selectedMessageStatusValue")) this.updateSelectedName();
  }

  selectionChange(event: any) {
    this.setMessageStatusValue.emit(event.value);
    const tmp = this.messagesStatuses.find(ws => ws.status === event.value);
    if (tmp) this.setMessageStatus.emit(tmp);
  }

  async refreshmessagesStatuses() {
    try{
      this.messagesStatuses = await this.db.find().toPromise();
      this.updateSelected();
      this.updateSelectedName();
    }catch(e){
      console.log("messagesStatuseselectorComponent: refresh error", e);
    }
  }
  updateSelected(): void {
    if (this.selectedMessageStatus && this.messagesStatuses.length > 0) {
      const tmp = this.messagesStatuses.find(ws => ws.status === this.selectedMessageStatus.status);
      this.selected = (tmp && tmp.status) ? tmp.status : 0;
    }
  }
  updateSelectedName(): void {
    if (this.selectedMessageStatusValue && this.messagesStatuses.length > 0) {
      const tmp = this.messagesStatuses.find(ws => ws.status === this.selectedMessageStatusValue);
      this.selected = (tmp && tmp.status) ? tmp.status : 0;
    }
  }

}
