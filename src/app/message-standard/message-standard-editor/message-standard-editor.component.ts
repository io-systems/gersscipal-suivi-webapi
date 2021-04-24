import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageStandard } from '../../api/models/message-standard';
import { MessageStandardControllerService } from '../../api/services/message-standard-controller.service';

@Component({
  selector: 'app-message-standard-editor',
  templateUrl: './message-standard-editor.component.html',
  styleUrls: ['./message-standard-editor.component.scss']
})
export class MessageStandardEditorComponent implements OnInit {
  messageStandardForm: FormGroup;
  fieldAleaMaxLength: number = 8;
  fieldLabelMaxLength: number = 32;
  fieldDescriptionMaxLength: number = 64;
  @Input() messageStandard: MessageStandard;
  @Output() result: EventEmitter<boolean> = new EventEmitter();
  // [
  //   'alea', 
  //   'operation', 
  //   'label', 
  //   'description', 
  //   'createdAt', 
  //   'updatedAt', 
  //   'functions'
  // ];

  constructor(
    private db: MessageStandardControllerService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.messageStandardForm = this.formBuilder.group({
      alea: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.fieldAleaMaxLength)
      ]),
      label: new FormControl('', [
        Validators.maxLength(this.fieldLabelMaxLength)
      ]),
      description: new FormControl('', [
        Validators.maxLength(this.fieldDescriptionMaxLength)
      ])
    });
    if (this.messageStandard.alea) {
      this.messageStandardForm.controls.alea.setValue(this.messageStandard.alea);
      this.messageStandardForm.controls.label.setValue(this.messageStandard.label);
      this.messageStandardForm.controls.description.setValue(this.messageStandard.description);
    }else{
      this.messageStandardForm.reset();
    }
  }

  updateOperation(event): void {
    this.messageStandard.operation = event;
  }

  _cancel(): void {
    this.result.emit(false);
  }
  async _save() {
    if (!this.messageStandardForm.valid) return;
    const result: MessageStandard = {
      alea: this.messageStandardForm.controls.alea.value,
      operation: this.messageStandard.operation,
      label: this.messageStandardForm.controls.label.value || "",
      description: this.messageStandardForm.controls.description.value || ""
    }
    const params = {
      filter: JSON.stringify({
        where: {
          and: [
            {alea: result.alea},
            {operation: result.operation}
          ]
        }
      })
    }
    let msg = "db lookup:";
    try{
      const itemList = await this.db.find(params).toPromise();
      // contrôle du nombre d'instances
      if (itemList.length > 1) {
        this._snackBar.open("Le nom existe déjà en plusieurs exemplaires... Faites du ménage !", "X", {
          duration: 2000
        });
        return;
      }
      let dbresult: any = {};
      if (itemList.length === 1) {
        // mise à jour de l'instance
        msg = "db update:";
        dbresult = await this.db.updateById({id: itemList[0].id, body: result}).toPromise();
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
