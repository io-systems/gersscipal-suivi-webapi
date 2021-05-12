import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WorkshopBottomsheetEditorComponent } from './workshop-bottomsheet-editor/workshop-bottomsheet-editor.component';
import { Workshop } from '../api/models/workshop';
import { WorkshopControllerService } from '../api/services/workshop-controller.service';
import { FilterService } from '../filter/filter.service';
import { ConfigService } from '../config.service';
import { ProgressBarService } from '../progress-bar.service';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.scss']
})
export class WorkshopComponent implements OnInit {
  dataArray: Workshop[] = [];
  displayedColumns: string[] = ['name', 'description', 'createdAt', 'updatedAt', 'functions'];
  filter: any = {
    offset: 0,
    limit: 25,
    order: "id DESC",
    where: {}
  };
  dataCount: {count?: number} = {count: 0};
  whereSubscription: Subscription;

  constructor(
    private db: WorkshopControllerService,
    private _bottomSheet: MatBottomSheet,
    private _snackBar: MatSnackBar,
    private _filter: FilterService,
    private _config: ConfigService,
    private _progressBar: ProgressBarService
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
    this._progressBar.setLoadingState(true);
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
    this._progressBar.setLoadingState(false);
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
  
}
