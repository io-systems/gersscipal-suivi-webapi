import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Workstation } from '../../api/models/workstation';
import { WorkstationControllerService } from '../../api/services/workstation-controller.service';

@Component({
  selector: 'app-workstation-selector',
  templateUrl: './workstation-selector.component.html',
  styleUrls: ['./workstation-selector.component.scss']
})
export class WorkstationSelectorComponent implements OnInit {
  workstations: Workstation[] = []
  @Input() selectedWorkstation: Workstation;
  @Input() selectedWorkstationCode: string;
  @Output() setWorkstation: EventEmitter<Workstation> = new EventEmitter();
  @Output() setWorkstationCode: EventEmitter<Workstation> = new EventEmitter();
  selected = "";

  constructor(
    private db: WorkstationControllerService
  ) { }

  ngOnInit(): void {
    this.refreshWorkstations();
  }
  ngOnChanges(s: SimpleChanges) {
    if (s.hasOwnProperty("selectedWorkstation")) this.updateSelected();
    if (s.hasOwnProperty("selectedWorkstationCode")) this.updateSelectedCode();
  }

  selectionChange(event: any) {
    this.setWorkstationCode.emit(event.value);
    const tmp = this.workstations.find(ws => ws.codem === event.value);
    if (tmp) this.setWorkstation.emit(tmp);
  }

  async refreshWorkstations() {
    try{
      this.workstations = await this.db.find().toPromise();
      this.updateSelected();
      this.updateSelectedCode();
    }catch(e){
      console.log("WorkshopSelectorComponent: refresh error", e);
    }
  }
  updateSelected(): void {
    if (this.selectedWorkstation && this.workstations.length > 0) {
      const tmp = this.workstations.find(ws => ws.codem === this.selectedWorkstation.codem);
      this.selected = (tmp && tmp.codem) ? tmp.codem : "";
    }
  }
  updateSelectedCode(): void {
    if (this.selectedWorkstationCode && this.workstations.length > 0) {
      const tmp = this.workstations.find(ws => ws.codem === this.selectedWorkstationCode);
      this.selected = (tmp && tmp.codem) ? tmp.codem : "";
    }
  }

}
