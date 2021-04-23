import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FabricationOrderBottomsheetEditorComponent } from './fabrication-order-bottomsheet-editor/fabrication-order-bottomsheet-editor.component';
import { FabricationOrder } from '../api/models/fabrication-order';
import { FabricationOrderControllerService } from '../api/services/fabrication-order-controller.service';

@Component({
  selector: 'app-fabrication-order',
  templateUrl: './fabrication-order.component.html',
  styleUrls: ['./fabrication-order.component.scss']
})
export class FabricationOrderComponent implements OnInit {
  fabricationOrders: FabricationOrder[] = [];
  displayedColumns: string[] = ['ofnr', 'codem', 'createdAt', 'updatedAt', 'functions'];
  filter: any = {};
  selectedWorkstation: FabricationOrder = {
    id: 0,
    ofnr: "",
    codem: "",
    createdAt: "",
    updatedAt: ""
  };
  selectedWorkstationName: string = ""


  constructor(
    private db: FabricationOrderControllerService,
    private _bottomSheet: MatBottomSheet,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.resetFilter();
    this.refresh();
  }

  resetFilter(): void {
    this.filter = {
      offset: 0,
      limit: 25
    }
  }

  refresh(): void {
    this.db.find(this.filter).subscribe(
      data => {
        if (this.filter.offset === 0) {
          this.fabricationOrders = data;
        }else{
          this.fabricationOrders.concat(data);
        }
      },
      err => console.log(err),
      () => {}
    );
  }

  // *************************
  // FONCTIONS D'ÉDITION
  // *************************
  create(): void {
    let newWS: FabricationOrder = {
      ofnr: "",
      codem: ""
    }
    const createBottomSheet = this._bottomSheet.open(FabricationOrderBottomsheetEditorComponent, {
      data: newWS
    });
    createBottomSheet.afterDismissed().subscribe(
      data => {},
      err => console.log(err),
      () => this.refresh()
    )
  }
  update(uw: FabricationOrder): void {
    const updateBottomSheet = this._bottomSheet.open(FabricationOrderBottomsheetEditorComponent, {
      data: uw
    });
    updateBottomSheet.afterDismissed().subscribe(
      data => {},
      err => console.log(err),
      () => this.refresh()
    )
  }
  copy(uw: FabricationOrder): void {
    let newWS: FabricationOrder = uw;
    newWS.ofnr = `_${uw.ofnr}`
    const copyBottomSheet = this._bottomSheet.open(FabricationOrderBottomsheetEditorComponent, {
      data: newWS
    });
    copyBottomSheet.afterDismissed().subscribe(
      data => {},
      err => console.log(err),
      () => this.refresh()
    )
  }
  async delete(dw: FabricationOrder) {
    if (!dw.id) return;
    const result = confirm(`Voulez-vous vraiment supprimer définitivement l'OF' ${dw.ofnr} ?`);
    if (result) {
      try{
        const deleteResult = await this.db.deleteById({id: dw.id}).toPromise();
        this._snackBar.open(`Atelier ${dw.ofnr} supprimé définitivement.`, "X", {
          duration: 2000
        });
      }catch(e){
        this._snackBar.open("Une erreur s'est produite, veuillez reessayer", "X", {
          duration: 2000
        });
      }
      this.refresh();
    }
  }

  // *************************
  // FONCTIONS DE SELECTION
  // *************************
  selectWorkstation(row: FabricationOrder) {
    this.selectedWorkstation = row;
  }
  selectWorkstationName(row: FabricationOrder) {
    this.selectedWorkstationName = row.ofnr;
  }

}
