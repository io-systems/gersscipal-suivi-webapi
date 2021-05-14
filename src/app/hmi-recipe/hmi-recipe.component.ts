import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigService } from '../config.service';
import { HmiRecipeFileControllerService } from '../api/services';
import { Workstation } from '../api/models/workstation';
import { WorkstationControllerService } from '../api/services/workstation-controller.service';

@Component({
  selector: 'app-hmi-recipe',
  templateUrl: './hmi-recipe.component.html',
  styleUrls: ['./hmi-recipe.component.scss']
})
export class HmiRecipeComponent implements OnInit {
  workstations: Workstation[] = [];
  mode: number = 0;

  constructor(
    private db: WorkstationControllerService,
    private hmiFile: HmiRecipeFileControllerService,
    private _snackBar: MatSnackBar,
    private _config: ConfigService
  ) { }

  ngOnInit(): void {
    this.refreshWorkstationList();
  }

  async refreshWorkstationList() {
    try{
      this.workstations = await this.db.find().toPromise();
    }catch(e){
      this.workstations = [];
      console.log("hmi-recipe component: ", e);
    }
  }

  async downloadCSV() {
    try{
      const result = await this.hmiFile.createCsvFile().toPromise();
      this._snackBar.open(`Fichier ${result.filename} créé`, 'X', {
        duration: this._config.SNACKBAR_TIMEOUT_TIME
      });
    }catch(e){
      console.log(e);
      this._snackBar.open(`Erreur serveur`, 'X', {
        duration: this._config.SNACKBAR_TIMEOUT_TIME
      });
    }
  }

}
