import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FabricationOrder } from '../../api/models/fabrication-order';
import { FabricationOrderControllerService } from '../../api/services/fabrication-order-controller.service';

@Component({
  selector: 'app-fabrication-order-selector',
  templateUrl: './fabrication-order-selector.component.html',
  styleUrls: ['./fabrication-order-selector.component.scss']
})
export class FabricationOrderSelectorComponent implements OnInit {
  fabricationOrders: FabricationOrder[] = []
  @Input() selectedFabricationOrder: FabricationOrder;
  @Input() selectedFabricationOrderNumber: string;
  @Input() workstation: string = "";
  @Output() setFabricationOrder: EventEmitter<FabricationOrder> = new EventEmitter();
  @Output() setFabricationOrderNumber: EventEmitter<FabricationOrder> = new EventEmitter();
  @Output() setWorkstation: EventEmitter<string> = new EventEmitter();
  selected = "";
  filter: any = {};

  constructor(
    private db: FabricationOrderControllerService
  ) { }

  ngOnInit(): void {
    this.refreshfabricationOrders();
  }
  ngOnChanges(s: SimpleChanges) {
    if (s.hasOwnProperty("selectedFabricationOrder")) this.updateSelected();
    if (s.hasOwnProperty("selectedFabricationOrderNumber")) this.updateSelectedOfnr();
    if (s.hasOwnProperty("workstation")) this.updateFilter();
  }

  selectionChange(event: any) {
    this.setFabricationOrderNumber.emit(event.value);
    const tmp = this.fabricationOrders.find(ws => ws.ofnr === event.value);
    if (tmp) {
      this.setFabricationOrder.emit(tmp);
      this.setWorkstation.emit(tmp.codem);
    }
  }

  async refreshfabricationOrders() {
    try{
      this.fabricationOrders = await this.db.find(this.filter).toPromise();
      this.updateSelected();
      this.updateSelectedOfnr();
    }catch(e){
      console.log("fabricationOrderselectorComponent: refresh error", e);
    }
  }
  updateFilter() {
    if (this.workstation) {
      this.filter = {
        filter: JSON.stringify({
          where: {
            codem: this.workstation
          }
        })
      }
    }else{
      this.filter = {};
    }
    this.refreshfabricationOrders();
  }
  updateSelected(): void {
    if (this.selectedFabricationOrder && this.fabricationOrders.length > 0) {
      const tmp = this.fabricationOrders.find(ws => ws.ofnr === this.selectedFabricationOrder.ofnr);
      this.selected = (tmp && tmp.ofnr) ? tmp.ofnr : "";
    }
  }
  updateSelectedOfnr(): void {
    if (this.selectedFabricationOrderNumber && this.fabricationOrders.length > 0) {
      const tmp = this.fabricationOrders.find(ws => ws.ofnr === this.selectedFabricationOrderNumber);
      this.selected = (tmp && tmp.ofnr) ? tmp.ofnr : "";
    }
  }

}
