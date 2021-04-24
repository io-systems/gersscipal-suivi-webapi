import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Operation } from '../../api/models/operation';
import { OperationControllerService } from '../../api/services/operation-controller.service';

@Component({
  selector: 'app-operation-editor',
  templateUrl: './operation-editor.component.html',
  styleUrls: ['./operation-editor.component.scss']
})
export class OperationEditorComponent implements OnInit {
  operationForm: FormGroup;
  fieldOperationMaxLength: number = 8;
  fieldDescriptionMaxLength: number = 32;
  @Input() operation: Operation;
  @Output() result: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private db: OperationControllerService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.operationForm = this.formBuilder.group({
      operation: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.fieldOperationMaxLength)
      ]),
      description: new FormControl('', [
        Validators.maxLength(this.fieldDescriptionMaxLength)
      ])
    });
    if (this.operation.operation) {
      this.operationForm.controls.operation.setValue(this.operation.operation);
      this.operationForm.controls.description.setValue(this.operation.description);
    }else{
      this.operationForm.reset();
    }
  }

  _cancel(): void {
    this.result.emit(false);
  }
  async _save() {
    if (!this.operationForm.valid) return;
    const result: Operation = {
      operation: this.operationForm.controls.operation.value,
      description: this.operationForm.controls.description.value || ""
    }
    const params = {
      filter: JSON.stringify({
        where: {
          operation: result.operation
        }
      })
    }
    let msg = "";
    try{
      msg = "db lookup:";
      const dbOperation = await this.db.find(params).toPromise();
      // contrôle du nombre d'instances
      if (dbOperation.length > 1) {
        this._snackBar.open("Le nom existe déjà en plusieurs exemplaires... Faites du ménage !", "X", {
          duration: 2000
        });
        return;
      }
      let dbresult;
      if (dbOperation.length === 1) {
        // mise à jour de l'instance
        msg = "db update:";
        dbresult = await this.db.updateById({id: dbOperation[0].id, body: result}).toPromise();
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
