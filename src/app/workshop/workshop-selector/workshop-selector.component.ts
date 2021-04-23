import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Workshop } from '../../api/models/workshop';
import { WorkshopControllerService } from '../../api/services/workshop-controller.service';

@Component({
  selector: 'app-workshop-selector',
  templateUrl: './workshop-selector.component.html',
  styleUrls: ['./workshop-selector.component.scss']
})
export class WorkshopSelectorComponent implements OnInit, OnChanges {
  workshops: Workshop[] = []
  @Input() selectedWorkshop: Workshop;
  @Input() selectedWorkshopName: string;
  @Output() setWorkshop: EventEmitter<Workshop> = new EventEmitter();
  @Output() setWorkshopName: EventEmitter<Workshop> = new EventEmitter();
  selected = "";

  constructor(
    private db: WorkshopControllerService
  ) { }

  ngOnInit(): void {
    this.refreshWorkshops();
  }
  ngOnChanges(s: SimpleChanges) {
    if (s.hasOwnProperty("selectedWorkshop")) this.updateSelected();
    if (s.hasOwnProperty("selectedWorkshopName")) this.updateSelectedName();
  }

  selectionChange(event) {
    this.setWorkshopName.emit(event.value);
    const tmp = this.workshops.find(ws => ws.name === event.value);
    if (tmp) this.setWorkshop.emit(tmp);
  }

  async refreshWorkshops() {
    try{
      this.workshops = await this.db.find().toPromise();
      this.updateSelected();
    }catch(e){
      console.log("WorkshopSelectorComponent: refresh error", e);
    }
  }
  updateSelected(): void {
    if (this.selectedWorkshop && this.workshops.length > 0) {
      const tmp = this.workshops.find(ws => ws.name === this.selectedWorkshop.name);
      this.selected = (tmp && tmp.name) ? tmp.name : "";
    }
  }
  updateSelectedName(): void {
    if (this.selectedWorkshopName && this.workshops.length > 0) {
      const tmp = this.workshops.find(ws => ws.name === this.selectedWorkshopName);
      this.selected = (tmp && tmp.name) ? tmp.name : "";
    }
  }


}
