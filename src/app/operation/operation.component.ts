import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OperationBottomsheetEditorComponent } from './operation-bottomsheet-editor/operation-bottomsheet-editor.component';
import { Operation } from '../api/models/operation';
import { OperationControllerService } from '../api/services/operation-controller.service';
import { FilterService } from '../filter/filter.service';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements OnInit {
  dataArray: Operation[] = [];
  displayedColumns: string[] = ['operation', 'description', 'createdAt', 'updatedAt', 'functions'];
  filter: any = {
    offset: 0,
    limit: 25,
    where: {}
  };
  selectedOperation: Operation = {
    id: 0,
    operation: "",
    description: ""
  };
  selectedOperationName: string = "";
  dataCount: {count?: number} = {count: 0};
  whereSubscription: Subscription;

  constructor(
    private db: OperationControllerService,
    private _bottomSheet: MatBottomSheet,
    private _snackBar: MatSnackBar,
    private _filter: FilterService,
    private _config: ConfigService
  ) {
    this.whereSubscription = this._filter.where.pipe(
      debounceTime(500)
    ).subscribe((where: any) => {
      this.updateWhereFilter(where);
    });
  }
  ngOnDestroy() {
    if (this.whereSubscription) this.whereSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.resetFilter();
    this.refresh();
  }

  resetFilter(): void {
    this.filter.offset = 0;
    this.filter.limit = this._config.REQUEST_LIMIT;
    this.refresh();
  }
  updateWhereFilter(where: any): void {
    this.filter.where = where;
    this.refresh();
  }
  more() {
    this.filter.offset = this.filter.offset + this._config.REQUEST_LIMIT;
    this.refresh();
  }

  async refresh() {
    const fil = {
      filter: JSON.stringify(this.filter)
    }
    const countFil = {
      where: this.filter.where
    }
    try{
      const data = await this.db.find(fil).toPromise();
      this.dataCount = await this.db.count(countFil).toPromise();
      if (this.filter.offset === 0) {
        this.dataArray = data;
      }else{
        this.dataArray = this.dataArray.concat(data);
      }
    }catch(e){
      console.log(e);
    }
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
