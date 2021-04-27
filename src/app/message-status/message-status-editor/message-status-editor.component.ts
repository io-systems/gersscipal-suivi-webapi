import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageStatus } from '../../api/models/message-status';
import { MessageStatusControllerService } from '../../api/services/message-status-controller.service';

@Component({
  selector: 'app-message-status-editor',
  templateUrl: './message-status-editor.component.html',
  styleUrls: ['./message-status-editor.component.scss']
})
export class MessageStatusEditorComponent implements OnInit {
  messageStatusForm: FormGroup;
  fieldDescriptionMaxLength: number = 32;
  @Input() messageStatus: MessageStatus;
  @Output() result: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private db: MessageStatusControllerService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.messageStatusForm = this.formBuilder.group({
      status: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(999)
      ]),
      description: new FormControl('', [
        Validators.maxLength(this.fieldDescriptionMaxLength)
      ])
    });
    if (this.messageStatus) {
      this.messageStatusForm.controls.status.setValue(this.messageStatus.status);
      this.messageStatusForm.controls.description.setValue(this.messageStatus.description);
    }else{
      this.messageStatusForm.reset();
    }
  }

  _cancel(): void {
    this.result.emit(false);
  }
  async _save() {
    if (!this.messageStatusForm.valid) return;
    const result: MessageStatus = {
      status: this.messageStatusForm.controls.status.value,
      description: this.messageStatusForm.controls.description.value || ""
    }
    const params = {
      filter: JSON.stringify({
        where: {
          status: result.status
        }
      })
    }
    let msg = "";
    try{
      msg = "db lookup:";
      const dbstatus = await this.db.find(params).toPromise();
      // contrôle du nombre d'instances
      if (dbstatus.length > 1) {
        this._snackBar.open("Le status existe déjà en plusieurs exemplaires... Faites du ménage !", "X", {
          duration: 2000
        });
        return;
      }
      let dbresult;
      if (dbstatus.length === 1) {
        // mise à jour de l'instance
        msg = "db update:";
        dbresult = await this.db.updateById({id: dbstatus[0].id, body: result}).toPromise();
      }else{
        msg = "db create:";
        // création de l'instance
        dbresult = await this.db.create({body: result}).toPromise();
      }
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
