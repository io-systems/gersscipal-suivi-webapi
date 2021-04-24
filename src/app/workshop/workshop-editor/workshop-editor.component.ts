import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Workshop } from '../../api/models/workshop';
import { WorkshopControllerService } from '../../api/services/workshop-controller.service';

@Component({
  selector: 'app-workshop-editor',
  templateUrl: './workshop-editor.component.html',
  styleUrls: ['./workshop-editor.component.scss']
})
export class WorkshopEditorComponent implements OnInit {
  workshopForm: FormGroup;
  fieldNameMaxLength: number = 8;
  fieldDescriptionMaxLength: number = 32;
  @Input() workshop: Workshop;
  @Output() result: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private db: WorkshopControllerService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.workshopForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.fieldNameMaxLength)
      ]),
      description: new FormControl('', [
        Validators.maxLength(this.fieldDescriptionMaxLength)
      ])
    });
    if (this.workshop.name) {
      this.workshopForm.controls.name.setValue(this.workshop.name);
      this.workshopForm.controls.description.setValue(this.workshop.description);
    }else{
      this.workshopForm.reset();
    }
  }

  _cancel(): void {
    this.result.emit(false);
  }
  async _save() {
    if (!this.workshopForm.valid) return;
    const result: Workshop = {
      name: this.workshopForm.controls.name.value,
      description: this.workshopForm.controls.description.value || ""
    }
    const params = {
      filter: JSON.stringify({
        where: {
          name: result.name
        }
      })
    }
    let msg = "";
    try{
      msg = "db lookup:";
      const dbWorkshop = await this.db.find(params).toPromise();
      // contrôle du nombre d'instances
      if (dbWorkshop.length > 1) {
        this._snackBar.open("Le nom existe déjà en plusieurs exemplaires... Faites du ménage !", "X", {
          duration: 2000
        });
        return;
      }
      let dbresult;
      if (dbWorkshop.length === 1) {
        // mise à jour de l'instance
        msg = "db update:";
        dbresult = await this.db.updateById({id: dbWorkshop[0].id, body: result}).toPromise();
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
