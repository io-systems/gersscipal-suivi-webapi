import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageStatusBottomsheetEditorComponent } from './message-status-bottomsheet-editor/message-status-bottomsheet-editor.component';
import { MessageStatus } from '../api/models/message-status';
import { MessageStatusControllerService } from '../api/services/message-status-controller.service';

@Component({
  selector: 'app-message-status',
  templateUrl: './message-status.component.html',
  styleUrls: ['./message-status.component.scss']
})
export class MessageStatusComponent implements OnInit {
  messagesStatuses: MessageStatus[] = [];
  displayedColumns: string[] = ['status', 'description', 'createdAt', 'updatedAt', 'functions'];
  filter: any = {};
  selectedMessageStatus: MessageStatus = {
    id: 0,
    status: 0,
    description: ""
  };
  selectedMessageStatusName: number = 0;

  constructor(
    private db: MessageStatusControllerService,
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
          this.messagesStatuses = data;
        }else{
          this.messagesStatuses.concat(data);
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
    let newWS: MessageStatus = {
      status: 0,
      description: ""
    }
    const createBottomSheet = this._bottomSheet.open(MessageStatusBottomsheetEditorComponent, {
      data: newWS
    });
    createBottomSheet.afterDismissed().subscribe(
      data => {},
      err => console.log(err),
      () => this.refresh()
    )
  }
  update(uw: MessageStatus): void {
    const updateBottomSheet = this._bottomSheet.open(MessageStatusBottomsheetEditorComponent, {
      data: uw
    });
    updateBottomSheet.afterDismissed().subscribe(
      data => {},
      err => console.log(err),
      () => this.refresh()
    )
  }
  copy(uw: MessageStatus): void {
    let newWS: MessageStatus = uw;
    newWS.status = 0;
    const copyBottomSheet = this._bottomSheet.open(MessageStatusBottomsheetEditorComponent, {
      data: newWS
    });
    copyBottomSheet.afterDismissed().subscribe(
      data => {},
      err => console.log(err),
      () => this.refresh()
    )
  }
  async delete(dw: MessageStatus) {
    if (!dw.id) return;
    const result = confirm(`Voulez-vous vraiment supprimer définitivement le statut ${dw.status} ?`);
    if (result) {
      try{
        const deleteResult = await this.db.deleteById({id: dw.id}).toPromise();
        this._snackBar.open(`Statut ${dw.status} supprimé définitivement.`, "X", {
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
  selectMessageStatus(row: MessageStatus) {
    this.selectedMessageStatus = row;
  }
  selectMessageStatusName(row: MessageStatus) {
    this.selectedMessageStatusName = row.status;
  }

}
