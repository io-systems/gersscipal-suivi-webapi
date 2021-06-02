import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { HmiRecipe } from '../../api/models/hmi-recipe';
import { HmiRecipeControllerService } from '../../api/services/hmi-recipe-controller.service';
import { AppCacheService } from '../../app-cache.service';
import { ConfigService } from '../../config.service';
import { ProgressBarService } from '../../progress-bar.service';
import { HmiRecipeBottomsheetFormComponent } from '../hmi-recipe-bottomsheet-form/hmi-recipe-bottomsheet-form.component';

@Component({
  selector: 'app-hmi-recipe-editor',
  templateUrl: './hmi-recipe-editor.component.html',
  styleUrls: ['./hmi-recipe-editor.component.scss']
})
export class HmiRecipeEditorComponent implements OnInit {
  recipes: HmiRecipe[] = [];
  addresses: string[] = [];
  @Input() workstation: string = "";
  displayedColumns: string[] = [
    "address",
    "operation",
    "alea",
    "label",
    "function"
  ];

  constructor(
    private db: HmiRecipeControllerService,
    private cache: AppCacheService,
    private _bottomSheet: MatBottomSheet,
    private _config: ConfigService,
    private _progressBar: ProgressBarService
  ) {
    this.addresses = this._config.PLC_ADDRESSES;
  }

  ngOnInit(): void {
    this.refresh();
  }
  async refresh() {
    if (this.workstation === "") return;
    this._progressBar.setLoadingState(true);
    try{
      let tmp = await this.db.find({
        filter: JSON.stringify({
          where: {codem: this.workstation}
        })
      }).toPromise();
      this.recipes = this.addresses.map((ad, i) => {
        const res = tmp.findIndex(r => r.index === i);
        if (res >= 0) {
          return tmp[res];
        }else{
          return {
            index: i, 
            operation: "", 
            alea: "", 
            label: "", 
            codem: this.workstation
          }
        }
      });
    }catch(e){
      this.recipes = [];
      console.log(e);
    }
    this._progressBar.setLoadingState(false);
  }

  edit(event: any): void {
    const createBottomSheet = this._bottomSheet.open(HmiRecipeBottomsheetFormComponent, {
      data: {
        workstation: this.workstation,
        recipes: this.recipes,
        edit: event
      }
    });
    createBottomSheet.afterDismissed().subscribe(
      data => {},
      err => console.log(err),
      () => this.refresh()
    )
  }
  
  async clear(event: any) {
    if (typeof event.index === "undefined" || !Number.isInteger(event.index) || event.index < 0) return;
    if (!confirm(`Voulez-vous vraiment supprimer le message attribué à l'adresse ${this.addresses[event.index]}`)) return;
    if (event.hasOwnProperty('id')) {
      await this.db.deleteById({id: event.id}).toPromise();
    }else{
      const index = this.recipes.findIndex(rec => rec.index === event.index);
      if (index < 0) return;
      this.recipes[index].operation = "";
      this.recipes[index].alea = "";
      this.recipes[index].label = "";
    }
    this.refresh();
  }

}
