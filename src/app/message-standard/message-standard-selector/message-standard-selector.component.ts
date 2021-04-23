import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MessageStandard } from '../../api/models/message-standard';
import { MessageStandardControllerService } from '../../api/services/message-standard-controller.service';

@Component({
  selector: 'app-message-standard-selector',
  templateUrl: './message-standard-selector.component.html',
  styleUrls: ['./message-standard-selector.component.scss']
})
export class MessageStandardSelectorComponent implements OnInit {
  messagesStandards: MessageStandard[] = []
  @Input() selectedMessageStandard: MessageStandard;
  @Input() selectedMessageStandardAlea: string;
  @Output() setMessageStandard: EventEmitter<MessageStandard> = new EventEmitter();
  @Output() setMessageStandardAlea: EventEmitter<MessageStandard> = new EventEmitter();
  selected = "";

  constructor(
    private db: MessageStandardControllerService
  ) { }

  ngOnInit(): void {
    this.refreshMessageStandards();
  }
  ngOnChanges(s: SimpleChanges) {
    if (s.hasOwnProperty("selectedMessageStandard")) this.updateSelected();
    if (s.hasOwnProperty("selectedMessageStandardAlea")) this.updateSelectedAlea();
  }

  selectionChange(event: any) {
    this.setMessageStandardAlea.emit(event.value);
    const tmp = this.messagesStandards.find(ws => ws.alea === event.value);
    if (tmp) this.setMessageStandard.emit(tmp);
  }

  async refreshMessageStandards() {
    try{
      this.messagesStandards = await this.db.find().toPromise();
      this.updateSelected();
      this.updateSelectedAlea();
    }catch(e){
      console.log("WorkshopSelectorComponent: refresh error", e);
    }
  }
  updateSelected(): void {
    if (this.selectedMessageStandard && this.messagesStandards.length > 0) {
      const tmp = this.messagesStandards.find(ws => ws.alea === this.selectedMessageStandard.alea);
      this.selected = (tmp && tmp.alea) ? tmp.alea : "";
    }
  }
  updateSelectedAlea(): void {
    if (this.selectedMessageStandardAlea && this.messagesStandards.length > 0) {
      const tmp = this.messagesStandards.find(ws => ws.alea === this.selectedMessageStandardAlea);
      this.selected = (tmp && tmp.alea) ? tmp.alea : "";
    }
  }

}
