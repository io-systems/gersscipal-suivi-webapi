import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WorkshopBottomsheetEditorComponent } from './workshop-bottomsheet-editor/workshop-bottomsheet-editor.component';
import { Workshop } from '../api/models/workshop';
import { WorkshopControllerService } from '../api/services/workshop-controller.service';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.scss']
})
export class WorkshopComponent implements OnInit {
  workshops: Workshop[] = [];
  displayedColumns: string[] = ['name', 'description', 'createdAt', 'updatedAt', 'functions'];
  filter: any = {};
  selectedWorkshop: Workshop = {
    id: 0,
    name: "",
    description: ""
  };
  selectedWorkshopName: string = ""

  constructor(
    private db: WorkshopControllerService,
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
          this.workshops = data;
        }else{
          this.workshops.concat(data);
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
    let newWS: Workshop = {
      name: "",
      description: ""
    }
    const createBottomSheet = this._bottomSheet.open(WorkshopBottomsheetEditorComponent, {
      data: newWS
    });
    createBottomSheet.afterDismissed().subscribe(
      data => {},
      err => console.log(err),
      () => this.refresh()
    )
  }
  update(uw: Workshop): void {
    const updateBottomSheet = this._bottomSheet.open(WorkshopBottomsheetEditorComponent, {
      data: uw
    });
    updateBottomSheet.afterDismissed().subscribe(
      data => {},
      err => console.log(err),
      () => this.refresh()
    )
  }
  copy(uw: Workshop): void {
    let newWS: Workshop = uw;
    newWS.name = `_${uw.name}`
    const copyBottomSheet = this._bottomSheet.open(WorkshopBottomsheetEditorComponent, {
      data: newWS
    });
    copyBottomSheet.afterDismissed().subscribe(
      data => {},
      err => console.log(err),
      () => this.refresh()
    )
  }
  async delete(dw: Workshop) {
    if (!dw.id) return;
    const result = confirm(`Voulez-vous vraiment supprimer définitivement l'atelier ${dw.name} ?`);
    if (result) {
      try{
        const deleteResult = await this.db.deleteById({id: dw.id}).toPromise();
        this._snackBar.open(`Atelier ${dw.name} supprimé définitivement.`, "X", {
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
  selectWorkshop(row: Workshop) {
    this.selectedWorkshop = row;
  }
  selectWorkshopName(row: Workshop) {
    this.selectedWorkshopName = row.name;
  }
}
