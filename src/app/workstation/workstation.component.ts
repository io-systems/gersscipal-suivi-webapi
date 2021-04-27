import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WorkstationBottomsheetEditorComponent } from './workstation-bottomsheet-editor/workstation-bottomsheet-editor.component';
import { Workstation } from '../api/models/workstation';
import { WorkstationControllerService } from '../api/services/workstation-controller.service';
import { FilterService } from '../filter/filter.service';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-workstation',
  templateUrl: './workstation.component.html',
  styleUrls: ['./workstation.component.scss']
})
export class WorkstationComponent implements OnInit {
  dataArray: Workstation[] = [];
  displayedColumns: string[] = ['codem', 'divaltoName', 'aleaPrefix', 'ipAddress', 'localization', 'description', 'createdAt', 'updatedAt', 'functions'];
  filter: any = {
    offset: 0,
    limit: 25,
    where: {}
  };
  dataCount: {count?: number} = {count: 0};
  whereSubscription: Subscription;

  constructor(
    private db: WorkstationControllerService,
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
  }

  // *************************
  // FONCTIONS D'ÉDITION
  // *************************
  create(): void {
    let newWS: Workstation = {
      codem: "",
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
    newWS.codem = `_${uw.codem}`
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
    const result = confirm(`Voulez-vous vraiment supprimer définitivement le poste ${dw.codem} ?`);
    if (result) {
      try{
        const deleteResult = await this.db.deleteById({id: dw.id}).toPromise();
        this._snackBar.open(`Atelier ${dw.codem} supprimé définitivement.`, "X", {
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
