import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HmiRecipe } from '../../api/models/hmi-recipe';
import { HmiRecipeControllerService } from '../../api/services/hmi-recipe-controller.service';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'app-hmi-recipe-form',
  templateUrl: './hmi-recipe-form.component.html',
  styleUrls: ['./hmi-recipe-form.component.scss']
})
export class HmiRecipeFormComponent {
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
    private _snackBar: MatSnackBar
  ) {
    this.addresses = this._config.PLC_ADDRESSES;
  }
  ngOnChanges(s: SimpleChanges) {
    if (s.hasOwnProperty("hmiRecipe")) {
      if (s.hmiRecipe.firstChange) return;
      const tmp = s.hmiRecipe.previousValue;
      if (tmp.operation.length <= 0 || tmp.alea <= 0) return;
      this._save(tmp);
    }
  }

  _cancel(): void {
    this.close.emit();
  }
  save() {
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
