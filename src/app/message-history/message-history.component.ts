import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageHistoryBottomsheetEditorComponent } from './message-history-bottomsheet-editor/message-history-bottomsheet-editor.component';
import { MessageHistory } from '../api/models/message-history';
import { MessageHistoryControllerService } from '../api/services/message-history-controller.service';
import { FilterService } from '../filter/filter.service';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-message-history',
  templateUrl: './message-history.component.html',
  styleUrls: ['./message-history.component.scss']
})
export class MessageHistoryComponent implements OnInit {
  dataArray: MessageHistory[] = [];
  displayedColumns: string[] = ['status', 'codem', 'ofnr', 'operation', 'alea', 'label', 'timestamp', 'value', 'createdAt', 'updatedAt', 'functions']
  filter: any = {
    offset: 0,
    limit: 25,
    where: {}
  };
  dataCount: {count?: number} = {count: 0};
  whereSubscription: Subscription;

  constructor(
    private db: MessageHistoryControllerService,
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
    let newWS: MessageHistory = {
      idAPI: 0,
      status: 0,
      codem: "",
      ofnr: "",
      operation: "",
      alea: "",
      label: "",
      timestamp: "",
      value: 0
    }
    const createBottomSheet = this._bottomSheet.open(MessageHistoryBottomsheetEditorComponent, {
      data: newWS
    });
    createBottomSheet.afterDismissed().subscribe(
      data => {},
      err => console.log(err),
      () => this.refresh()
    )
  }
  update(uw: MessageHistory): void {
    const updateBottomSheet = this._bottomSheet.open(MessageHistoryBottomsheetEditorComponent, {
      data: uw
    });
    updateBottomSheet.afterDismissed().subscribe(
      data => {},
      err => console.log(err),
      () => this.refresh()
    )
  }
  copy(uw: MessageHistory): void {
    let newWS: MessageHistory = uw;
    newWS.idAPI = 0;
    const copyBottomSheet = this._bottomSheet.open(MessageHistoryBottomsheetEditorComponent, {
      data: newWS
    });
    copyBottomSheet.afterDismissed().subscribe(
      data => {},
      err => console.log(err),
      () => this.refresh()
    )
  }
  async delete(dw: MessageHistory) {
    if (!dw.id) return;
    const result = confirm(`Voulez-vous vraiment supprimer définitivement le message ${dw.alea} ?`);
    if (result) {
      try{
        const deleteResult = await this.db.deleteById({id: dw.id}).toPromise();
        this._snackBar.open(`Message ${dw.alea} supprimé définitivement.`, "X", {
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
