import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HmiRecipe } from '../../api/models/hmi-recipe';
import { HmiRecipeControllerService } from '../../api/services/hmi-recipe-controller.service';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'app-hmi-recipe-form',
  templateUrl: './hmi-recipe-form.component.html',
  styleUrls: ['./hmi-recipe-form.component.scss']
})
export class HmiRecipeFormComponent implements OnInit {
  ihmButtonFormGroup: FormGroup;
  fieldBtnTextMaxLength: number = 16;
  @Input() codem: string = "";
  @Input() hmiRecipe: HmiRecipe = {
    index: 0,
    operation: "",
    alea: "",
    codem: this.codem,
    label: ""
  };
  @Output() hmiRecipeChange: EventEmitter<any> = new EventEmitter();
  @Output() next: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();
  addresses: string[] = [];

  constructor(
    private db: HmiRecipeControllerService,
    private _config: ConfigService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.addresses = this._config.PLC_ADDRESSES;
  }
  ngOnInit() {
    this.ihmButtonFormGroup = this.formBuilder.group({
      btnTextFR: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.fieldBtnTextMaxLength)
      ]),
      btnTextHU: new FormControl('', [
        Validators.maxLength(this.fieldBtnTextMaxLength)
      ]),
      btnTextEN: new FormControl('', [
        Validators.maxLength(this.fieldBtnTextMaxLength)
      ])
    });
    if (this.hmiRecipe.btnTextFR) this.ihmButtonFormGroup.controls.btnTextFR.setValue(this.hmiRecipe.btnTextFR);
    if (this.hmiRecipe.btnTextHU) this.ihmButtonFormGroup.controls.btnTextHU.setValue(this.hmiRecipe.btnTextHU);
    if (this.hmiRecipe.btnTextEN) this.ihmButtonFormGroup.controls.btnTextEN.setValue(this.hmiRecipe.btnTextEN);
  }
  ngOnChanges(s: SimpleChanges) {
    if (s.hasOwnProperty("hmiRecipe")) {
      if (s.hmiRecipe.firstChange) return;
      const tmp = s.hmiRecipe.previousValue;
      if (tmp.operation && tmp.operation.length > 0 && tmp.alea && tmp.alea.length > 0) this._save(tmp);
      if (s.hmiRecipe.currentValue.btnTextFR) {
        this.ihmButtonFormGroup.controls.btnTextFR.setValue(s.hmiRecipe.currentValue.btnTextFR);
        this.ihmButtonFormGroup.controls.btnTextHU.setValue(s.hmiRecipe.currentValue.btnTextHU);
        this.ihmButtonFormGroup.controls.btnTextEN.setValue(s.hmiRecipe.currentValue.btnTextEN);
      }else{
        this.ihmButtonFormGroup.reset();
      }
    }
  }

  _cancel(): void {
    this.close.emit();
  }
  save() {
    this.hmiRecipe.btnTextFR = this.ihmButtonFormGroup.controls.btnTextFR.value || '';
    this.hmiRecipe.btnTextHU = this.ihmButtonFormGroup.controls.btnTextHU.value || '';
    this.hmiRecipe.btnTextEN = this.ihmButtonFormGroup.controls.btnTextEN.value || '';
    this.next.emit();
  }
  async _save(recipe: HmiRecipe) {
    recipe.codem = this.codem || "";
    delete recipe.createdAt;
    delete recipe.updatedAt;
    let tmp = {};
    if (recipe.id && recipe.id > 0) {
      tmp = await this.db.findById({
        id: recipe.id
      }).toPromise();
    }
    if (Object.keys(tmp).length <= 0) {
      recipe = await this.db.create({body: recipe}).toPromise();
      this._snackBar.open(`${this.addresses[recipe.index]} créé.`, "X", {
        duration: this._config.SNACKBAR_TIMEOUT_TIME
      });
    }else{
      const count = await this.db.updateById({
        id: recipe.id,
        body: recipe
      }).toPromise();
      this._snackBar.open(`${this.addresses[recipe.index]} à jour..`, "X", {
        duration: this._config.SNACKBAR_TIMEOUT_TIME
      });
    }
  }

}
