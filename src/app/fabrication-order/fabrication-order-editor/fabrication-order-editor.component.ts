import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FabricationOrder } from '../../api/models/fabrication-order';
import { FabricationOrderControllerService } from '../../api/services/fabrication-order-controller.service';

@Component({
  selector: 'app-fabrication-order-editor',
  templateUrl: './fabrication-order-editor.component.html',
  styleUrls: ['./fabrication-order-editor.component.scss']
})
export class FabricationOrderEditorComponent implements OnInit {
  fabricationOrderForm: FormGroup;
  fieldofnrMaxLength: number = 12;
  @Input() fabricationOrder: FabricationOrder;
  @Output() result: EventEmitter<boolean> = new EventEmitter();
  // [
  //   'ofnr', 
  //   'codem'
  //   'startedAt'
  //   'stoppedAt'
  //   'createdAt', 
  //   'updatedAt', 
  //   'functions'
  // ];


  constructor(
    private db: FabricationOrderControllerService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fabricationOrderForm = this.formBuilder.group({
      ofnr: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.fieldofnrMaxLength)
      ])
    });
    if (this.fabricationOrder.ofnr) {
      this.fabricationOrderForm.controls.ofnr.setValue(this.fabricationOrder.ofnr);
    }else{
      this.fabricationOrderForm.reset();
    }
  }

  updateCodem(event: any): void {
    this.fabricationOrder.codem = event;
  }

  _cancel(): void {
    this.result.emit(false);
  }
  async _save() {
    if (!this.fabricationOrderForm.valid) return;
    const result: FabricationOrder = {
      ofnr: this.fabricationOrderForm.controls.ofnr.value,
      codem: this.fabricationOrder.codem
    }
    const params = {
      filter: JSON.stringify({
        where: {
          ofnr: result.ofnr
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
