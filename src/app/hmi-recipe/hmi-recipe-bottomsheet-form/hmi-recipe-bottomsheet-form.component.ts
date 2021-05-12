import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { HmiRecipe } from '../../api/models/hmi-recipe';
import { HmiRecipeControllerService } from '../../api/services/hmi-recipe-controller.service';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'app-hmi-recipe-bottomsheet-form',
  templateUrl: './hmi-recipe-bottomsheet-form.component.html',
  styleUrls: ['./hmi-recipe-bottomsheet-form.component.scss']
})
export class HmiRecipeBottomsheetFormComponent {

  addresses: string[] = [];

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<HmiRecipeBottomsheetFormComponent>,
    private _config: ConfigService,
    private db: HmiRecipeControllerService
   ) {
    this.addresses = this._config.PLC_ADDRESSES;
  }

  close(): void {
    this._bottomSheetRef.dismiss();
  }
  navLeft(rewind: boolean = false): void {
    let index = this.data.edit.index;
    if (index <= 0) {
      index = (rewind) ? 31 : index;
    }else{
      index = this.data.edit.index - 1;
    }
    this.data.edit = this.data.recipes.find(rc => rc.index === index);
  }
  navRight(rewind: boolean = false): void {
    let index = this.data.edit.index;
    if (index >= 31) {
      index = (rewind) ? 0 : index;
    }else{
      index = this.data.edit.index + 1;
    }
    this.data.edit = this.data.recipes.find(rc => rc.index === index);
  }

}
