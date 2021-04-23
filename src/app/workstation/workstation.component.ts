import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WorkstationBottomsheetEditorComponent } from './workstation-bottomsheet-editor/workstation-bottomsheet-editor.component';
import { Workstation } from '../api/models/workstation';
import { WorkstationControllerService } from '../api/services/workstation-controller.service';

@Component({
  selector: 'app-workstation',
  templateUrl: './workstation.component.html',
  styleUrls: ['./workstation.component.scss']
})
export class WorkstationComponent implements OnInit {
  workstations: Workstation[] = [];
  displayedColumns: string[] = ['divaltoCode', 'divaltoName', 'aleaPrefix', 'ipAddress', 'localization', 'description', 'createdAt', 'updatedAt', 'functions'];
  filter: any = {};
  selectedWorkstation: Workstation = {
    id: 0,
    divaltoCode: "",
    divaltoName: "",
    aleaPrefix: "",
    localization: "",
    ipAddress: "",
    description: "",
    createdAt: "",
    updatedAt: ""
  };
  selectedWorkstationName: string = ""

  constructor(
    private db: WorkstationControllerService,
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
          this.workstations = data;
        }else{
          this.workstations.concat(data);
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
    let newWS: Workstation = {
      divaltoCode: "",
      divaltoName: "",
      aleaPrefix: "",
      localization: "",
      ipAddress: "",
      description: ""
    }
    const createBottomSheet = this._bottomSheet.open(WorkstationBottomsheetEditorComponent, {
      data: newWS
    });
    createBottomSheet.afterDismissed().subscribe(
      data => {},
      err => console.log(err),
      () => this.refresh()
    )
  }
  update(uw: Workstation): void {
    const updateBottomSheet = this._bottomSheet.open(WorkstationBottomsheetEditorComponent, {
      data: uw
    });
    updateBottomSheet.afterDismissed().subscribe(
      data => {},
      err => console.log(err),
      () => this.refresh()
    )
  }
  copy(uw: Workstation): void {
    let newWS: Workstation = uw;
    newWS.divaltoCode = `_${uw.divaltoCode}`
    const copyBottomSheet = this._bottomSheet.open(WorkstationBottomsheetEditorComponent, {
      data: newWS
    });
    copyBottomSheet.afterDismissed().subscribe(
      data => {},
      err => console.log(err),
      () => this.refresh()
    )
  }
  async delete(dw: Workstation) {
    if (!dw.id) return;
    const result = confirm(`Voulez-vous vraiment supprimer définitivement le poste ${dw.divaltoCode} ?`);
    if (result) {
      try{
        const deleteResult = await this.db.deleteById({id: dw.id}).toPromise();
        this._snackBar.open(`Atelier ${dw.divaltoCode} supprimé définitivement.`, "X", {
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
  selectWorkstation(row: Workstation) {
    this.selectedWorkstation = row;
  }
  selectWorkstationName(row: Workstation) {
    this.selectedWorkstationName = row.divaltoCode;
  }

}
