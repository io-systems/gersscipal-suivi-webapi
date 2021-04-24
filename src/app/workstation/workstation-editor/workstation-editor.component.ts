import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Workstation } from '../../api/models/workstation';
import { WorkstationControllerService } from '../../api/services/workstation-controller.service';

@Component({
  selector: 'app-workstation-editor',
  templateUrl: './workstation-editor.component.html',
  styleUrls: ['./workstation-editor.component.scss']
})
export class WorkstationEditorComponent implements OnInit {
  workstationForm: FormGroup;
  fieldDivaltoCodeMaxLength: number = 8;
  fieldDivaltoNameMaxLength: number = 32;
  fieldAleaPrefixMaxLength: number = 8;
  fieldIpAddressMaxLength: number = 15;
  fieldLocalizationMaxLength: number = 8;
  fieldDescriptionMaxLength: number = 64;
  @Input() workstation: Workstation;
  @Output() result: EventEmitter<boolean> = new EventEmitter();
  // [
  //   'divaltoCode', 
  //   'divaltoName', 
  //   'aleaPrefix', 
  //   'ipAddress', 
  //   'localization', 
  //   'description', 
  //   'createdAt', 
  //   'updatedAt', 
  //   'functions'
  // ];

  constructor(
    private db: WorkstationControllerService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.workstationForm = this.formBuilder.group({
      divaltoCode: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.fieldDivaltoCodeMaxLength)
      ]),
      divaltoName: new FormControl('', [
        Validators.maxLength(this.fieldDescriptionMaxLength)
      ]),
      aleaPrefix: new FormControl('', [
        Validators.maxLength(this.fieldAleaPrefixMaxLength)
      ]),
      ipAddress: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.fieldIpAddressMaxLength)
      ]),
      description: new FormControl('', [
        Validators.maxLength(this.fieldDescriptionMaxLength)
      ])
    });
    if (this.workstation.divaltoName) {
      this.workstationForm.controls.divaltoCode.setValue(this.workstation.divaltoCode);
      this.workstationForm.controls.divaltoName.setValue(this.workstation.divaltoName);
      this.workstationForm.controls.aleaPrefix.setValue(this.workstation.aleaPrefix);
      this.workstationForm.controls.ipAddress.setValue(this.workstation.ipAddress);
      this.workstationForm.controls.description.setValue(this.workstation.description);
    }else{
      this.workstationForm.reset();
    }
  }

  updateLocalization(event): void {
    this.workstation.localization = event;
  }

  _cancel(): void {
    this.result.emit(false);
  }
  async _save() {
    if (!this.workstationForm.valid) return;
    const result: Workstation = {
      divaltoCode: this.workstationForm.controls.divaltoCode.value,
      divaltoName: this.workstationForm.controls.divaltoName.value || "",
      aleaPrefix: this.workstationForm.controls.aleaPrefix.value || "",
      ipAddress: this.workstationForm.controls.ipAddress.value,
      localization: this.workstation.localization || "",
      description: this.workstationForm.controls.description.value || ""
    }
    const params = {
      filter: JSON.stringify({
        where: {
          divaltoCode: result.divaltoCode
        }
      })
    }
    let msg = "db lookup:";
    try{
      const dbWorkshop = await this.db.find(params).toPromise();
      // contrôle du nombre d'instances
      if (dbWorkshop.length > 1) {
        this._snackBar.open("Le nom existe déjà en plusieurs exemplaires... Faites du ménage !", "X", {
          duration: 2000
        });
        return;
      }
      let dbresult: any = {};
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
