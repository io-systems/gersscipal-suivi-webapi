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
  fieldUnitMaxLength: number = 16;
  @Input() workstation: Workstation;
  @Output() result: EventEmitter<boolean> = new EventEmitter();
  // [
  //   'codem', 
  //   'divaltoName', 
  //   'aleaPrefix', 
  //   'ipAddress', 
  //   'localization', 
  //   'maxPalettePerHour',
  //   'unit',
  //   'recordingPeriod',
  //   'active',
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
      codem: new FormControl('', [
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
      maxPalettePerHour: new FormControl('', [
        Validators.required,
        Validators.min(0)
      ]),
      unit: new FormControl('', [
        Validators.maxLength(this.fieldUnitMaxLength)
      ]),
      recordingRate: new FormControl('', [
        Validators.required,
        Validators.min(0)
      ]),
      active: new FormControl(false),
      description: new FormControl('', [
        Validators.maxLength(this.fieldDescriptionMaxLength)
      ])
    });
    if (this.workstation.divaltoName) {
      this.workstationForm.controls.codem.setValue(this.workstation.codem);
      this.workstationForm.controls.divaltoName.setValue(this.workstation.divaltoName);
      this.workstationForm.controls.aleaPrefix.setValue(this.workstation.aleaPrefix);
      this.workstationForm.controls.ipAddress.setValue(this.workstation.ipAddress);
      this.workstationForm.controls.maxPalettePerHour.setValue(this.workstation.maxPalettePerHour);
      this.workstationForm.controls.unit.setValue(this.workstation.unit);
      this.workstationForm.controls.recordingRate.setValue(this.workstation.recordingRate);
      this.workstationForm.controls.active.setValue(this.workstation.active);
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
      codem: this.workstationForm.controls.codem.value,
      divaltoName: this.workstationForm.controls.divaltoName.value || "",
      aleaPrefix: this.workstationForm.controls.aleaPrefix.value || "",
      ipAddress: this.workstationForm.controls.ipAddress.value,
      maxPalettePerHour: this.workstationForm.controls.maxPalettePerHour.value,
      unit: this.workstationForm.controls.unit.value || "",
      recordingRate: this.workstationForm.controls.recordingRate.value,
      active: this.workstationForm.controls.active.value ? true : false,
      localization: this.workstation.localization || "",
      description: this.workstationForm.controls.description.value || ""
    }
    const params = {
      filter: JSON.stringify({
        where: {
          codem: result.codem
        }
      })
    }
    let msg = "db lookup:";
    try{
      const dbWorkstation = await this.db.find(params).toPromise();
      // contrôle du nombre d'instances
      if (dbWorkstation.length > 1) {
        this._snackBar.open("Le nom existe déjà en plusieurs exemplaires... Faites du ménage !", "X", {
          duration: 2000
        });
        return;
      }
      let dbresult: any = {};
      if (dbWorkstation.length === 1) {
        // mise à jour de l'instance
        msg = "db update:";
        dbresult = await this.db.updateById({id: dbWorkstation[0].id, body: result}).toPromise();
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
