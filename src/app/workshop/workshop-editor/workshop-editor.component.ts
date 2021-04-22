import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
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

  constructor(
    private db: WorkshopControllerService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Workshop,
    private _bottomSheetRef: MatBottomSheetRef<WorkshopEditorComponent>,
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
    if (this.data.name) {
      this.workshopForm.controls.name.setValue(this.data.name);
      this.workshopForm.controls.description.setValue(this.data.description);
    }else{
      this.workshopForm.reset();
    }
  }

  cancel(): void {
    this._bottomSheetRef.dismiss();
  }
  save(): void {
    if (!this.workshopForm.valid) return;
    const result: Workshop = {
      name: this.workshopForm.controls.name.value,
      description: this.workshopForm.controls.description.value || ""
    }
    const params = {
      filter: {
        where: {
          name: result.name
        }
      }
    }
    console.log(params);
    this.db.find(params).subscribe(
      data => {
        console.log(data);
        console.log("save:", result);
        // contrôle du nombre d'instances
        if (data.length > 1) {
          this._snackBar.open("Le nom existe déjà en plusieurs exemplaires... Faites du ménage !", "X", {
            duration: 2000
          });
          return;
        }
        // mise à jour de l'instance
        if (data.length === 1) {
          this.db.updateById({id: data[0].id, body: result}).subscribe(
            data => this._bottomSheetRef.dismiss(true),
            err => {
              console.log("updateById: ", err);
              this._snackBar.open("Une erreur est apparue, veuillez reessayer...", "X", {
                duration: 2000
              });
            }
          )
        }else{
          // ou enregistrement d'une nouvelle instance
          this.db.create({body: result}).subscribe(
            data => this._bottomSheetRef.dismiss(true),
            err => {
              console.log("create: ", err);
              this._snackBar.open("Une erreur est apparue, veuillez reessayer...", "X", {
                duration: 2000
              });
            }
          )
        }
      },
      err => {
        console.log("find result.name: ", err);
        this._snackBar.open("Une erreur est apparue, veuillez reessayer...", "X", {
          duration: 2000
        });
      }
    )
  }

}
