import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FabricationOrderBottomsheetEditorComponent } from './fabrication-order-bottomsheet-editor/fabrication-order-bottomsheet-editor.component';
import { FabricationOrder } from '../api/models/fabrication-order';
import { FabricationOrderControllerService } from '../api/services/fabrication-order-controller.service';
import { FilterService } from '../filter/filter.service';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-fabrication-order',
  templateUrl: './fabrication-order.component.html',
  styleUrls: ['./fabrication-order.component.scss']
})
export class FabricationOrderComponent implements OnInit {
  dataArray: FabricationOrder[] = [];
  displayedColumns: string[] = ['ofnr', 'codem', 'startedAt', 'stoppedAt', 'createdAt', 'updatedAt', 'functions'];
  filter: any = {
    offset: 0,
    limit: 25,
    order: "id DESC",
    where: {}
  };
  dataCount: {count?: number} = {count: 0};
  whereSubscription: Subscription;
  loading: boolean = false;

  constructor(
    private db: FabricationOrderControllerService,
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
  reload(): void {
    this.filter.limit = this.filter.limit + this.filter.offset;
    this.filter.offset = 0;
    this.refresh();
  }

  async refresh() {
    this.loading = true;
    const fil = {
      filter: JSON.stringify(this.filter)
    }
    const countFil = {
      where: JSON.stringify(this.filter.where)
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
    this.loading = false;
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

}
