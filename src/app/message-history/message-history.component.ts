import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageHistoryBottomsheetEditorComponent } from './message-history-bottomsheet-editor/message-history-bottomsheet-editor.component';
import { MessageHistory } from '../api/models/message-history';
import { MessageHistoryControllerService } from '../api/services/message-history-controller.service';

@Component({
  selector: 'app-message-history',
  templateUrl: './message-history.component.html',
  styleUrls: ['./message-history.component.scss']
})
export class MessageHistoryComponent implements OnInit {
  messages: MessageHistory[] = [];
  displayedColumns: string[] = ['status', 'codem', 'ofnr', 'operation', 'alea', 'label', 'timestamp', 'value', 'createdAt', 'updatedAt', 'functions']
  filter: any = {};
  selectedMessage: MessageHistory = {
    id: 0,
    idAPI: 0,
    status: 0,
    codem: "",
    operation: "",
    alea: "",
    label: "",
    timestamp: "",
    value: 0,
    createdAt: "",
    updatedAt: ""
  };
  selectedMessageId: number = 0;

  constructor(
    private db: MessageHistoryControllerService,
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
          this.messages = data;
        }else{
          this.messages.concat(data);
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

  // *************************
  // FONCTIONS DE SELECTION
  // *************************
  selectMessage(row: MessageHistory) {
    this.selectedMessage = row;
  }
  selectMessageId(row: MessageHistory) {
    this.selectedMessageId = row.id;
  }

}
