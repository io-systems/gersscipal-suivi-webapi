import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageStandardBottomsheetEditorComponent } from './message-standard-bottomsheet-editor/message-standard-bottomsheet-editor.component';
import { MessageStandard } from '../api/models/message-standard';
import { MessageStandardControllerService } from '../api/services/message-standard-controller.service';

@Component({
  selector: 'app-message-standard',
  templateUrl: './message-standard.component.html',
  styleUrls: ['./message-standard.component.scss']
})
export class MessageStandardComponent implements OnInit {
  messagesStandards: MessageStandard[] = [];
  displayedColumns: string[] = ['alea', 'operation', 'label', 'description', 'createdAt', 'updatedAt', 'functions'];
  filter: any = {};
  selectedMessageStandard: MessageStandard = {
    id: 0,
    alea: "",
    operation: "",
    label: "",
    description: "",
    createdAt: "",
    updatedAt: ""
  };
  selectedMessageStandardName: string = ""

  constructor(
    private db: MessageStandardControllerService,
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
          this.messagesStandards = data;
        }else{
          this.messagesStandards.concat(data);
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
    let newWS: MessageStandard = {
      alea: "",
      operation: "",
      label: "",
      description: ""
    }
    const createBottomSheet = this._bottomSheet.open(MessageStandardBottomsheetEditorComponent, {
      data: newWS
    });
    createBottomSheet.afterDismissed().subscribe(
      data => {},
      err => console.log(err),
      () => this.refresh()
    )
  }
  update(uw: MessageStandard): void {
    const updateBottomSheet = this._bottomSheet.open(MessageStandardBottomsheetEditorComponent, {
      data: uw
    });
    updateBottomSheet.afterDismissed().subscribe(
      data => {},
      err => console.log(err),
      () => this.refresh()
    )
  }
  copy(uw: MessageStandard): void {
    let newWS: MessageStandard = uw;
    newWS.alea = `_${uw.alea}`
    const copyBottomSheet = this._bottomSheet.open(MessageStandardBottomsheetEditorComponent, {
      data: newWS
    });
    copyBottomSheet.afterDismissed().subscribe(
      data => {},
      err => console.log(err),
      () => this.refresh()
    )
  }
  async delete(dw: MessageStandard) {
    if (!dw.id) return;
    const result = confirm(`Voulez-vous vraiment supprimer définitivement le poste ${dw.alea} ?`);
    if (result) {
      try{
        const deleteResult = await this.db.deleteById({id: dw.id}).toPromise();
        this._snackBar.open(`Atelier ${dw.alea} supprimé définitivement.`, "X", {
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
  selectMessageStandard(row: MessageStandard) {
    this.selectedMessageStandard = row;
  }
  selectMessageStandardName(row: MessageStandard) {
    this.selectedMessageStandardName = row.alea;
  }

}
