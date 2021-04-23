import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OperationBottomsheetEditorComponent } from './operation-bottomsheet-editor/operation-bottomsheet-editor.component';
import { Operation } from '../api/models/operation';
import { OperationControllerService } from '../api/services/operation-controller.service';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements OnInit {
  operations: Operation[] = [];
  displayedColumns: string[] = ['operation', 'description', 'createdAt', 'updatedAt', 'functions'];
  filter: any = {};
  selectedOperation: Operation = {
    id: 0,
    operation: "",
    description: ""
  };
  selectedOperationName: string = ""

  constructor(
    private db: OperationControllerService,
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
          this.operations = data;
        }else{
          this.operations.concat(data);
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
    let newWS: Operation = {
      operation: "",
      description: ""
    }
    const createBottomSheet = this._bottomSheet.open(OperationBottomsheetEditorComponent, {
      data: newWS
    });
    createBottomSheet.afterDismissed().subscribe(
      data => {},
      err => console.log(err),
      () => this.refresh()
    )
  }
  update(uw: Operation): void {
    const updateBottomSheet = this._bottomSheet.open(OperationBottomsheetEditorComponent, {
      data: uw
    });
    updateBottomSheet.afterDismissed().subscribe(
      data => {},
      err => console.log(err),
      () => this.refresh()
    )
  }
  copy(uw: Operation): void {
    let newWS: Operation = uw;
    newWS.operation = `_${uw.operation}`
    const copyBottomSheet = this._bottomSheet.open(OperationBottomsheetEditorComponent, {
      data: newWS
    });
    copyBottomSheet.afterDismissed().subscribe(
      data => {},
      err => console.log(err),
      () => this.refresh()
    )
  }
  async delete(dw: Operation) {
    if (!dw.id) return;
    const result = confirm(`Voulez-vous vraiment supprimer définitivement l'opération ${dw.operation} ?`);
    if (result) {
      try{
        const deleteResult = await this.db.deleteById({id: dw.id}).toPromise();
        this._snackBar.open(`Opération ${dw.operation} supprimé définitivement.`, "X", {
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
  selectOperation(row: Operation) {
    this.selectedOperation = row;
  }
  selectOperationName(row: Operation) {
    this.selectedOperationName = row.operation;
  }

}
