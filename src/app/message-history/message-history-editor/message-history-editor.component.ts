import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageHistory } from '../../api/models/message-history';
import { MessageHistoryControllerService } from '../../api/services/message-history-controller.service';

@Component({
  selector: 'app-message-history-editor',
  templateUrl: './message-history-editor.component.html',
  styleUrls: ['./message-history-editor.component.scss']
})
export class MessageHistoryEditorComponent implements OnInit {
  messageForm: FormGroup;
  fieldLabelMaxLength: number = 32;
  @Input() message: MessageHistory;
  @Output() result: EventEmitter<boolean> = new EventEmitter();
  // [
  //   'status',
  //   'codem', 
  //   'ofnr', 
  //   'operation', 
  //   'alea', 
  //   'label', 
  //   'timestamp', 
  //   'value', 
  //   'createdAt', 
  //   'updatedAt', 
  //   'functions'
  //   ] -->

  constructor(
    private db: MessageHistoryControllerService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      label: new FormControl('', [
        Validators.maxLength(this.fieldLabelMaxLength)
      ]),
      value: new FormControl('', [
        Validators.min(0),
        Validators.max(32765)
      ])
    });
    if (this.message.id) {
      this.messageForm.controls.label.setValue(this.message.label);
      this.messageForm.controls.value.setValue(this.message.value);
    }else{
      this.messageForm.reset();
    }
  }

  updateMessageStatus(event): void {
    this.message.status = event;
  }
  updateMessageCodem(event): void {
    this.message.codem = event;
  }
  updateMessageOfnr(event): void {
    this.message.ofnr = event;
  }
  updateMessageOperation(event): void {
    this.message.operation = event;
  }
  updateMessageAlea(event): void {
    this.message.alea = event;
  }

  _cancel(): void {
    this.result.emit(false);
  }
  async _save() {
    if (!this.messageForm.valid) return;
    const result: MessageHistory = {
      idAPI: 0,
      status: 0,
      codem: this.message.codem,
      ofnr: this.message.ofnr,
      operation: this.message.operation,
      alea: this.message.alea,
      label: this.messageForm.controls.label.value || "",
      timestamp: new Date().toJSON(),
      value: this.messageForm.controls.value.value || 0
    }
    let msg = "db create:";
    try{
      // création de l'instance
      this.db.create({body: result}).toPromise();
      this._snackBar.open("Données mise à jour avec succès :-)", "X", {
        duration: 2000
      });
      this.result.emit(true);

    }catch(e){
      console.log(msg, e);
      this._snackBar.open("Une erreur est apparue, veuillez reessayer...", "X", {
        duration: 2000
      });
    }
  }

}
