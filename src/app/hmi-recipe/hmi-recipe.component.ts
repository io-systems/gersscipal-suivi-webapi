import { Component, OnInit } from '@angular/core';
import { Workstation } from '../api/models/workstation';
import { WorkstationControllerService } from '../api/services/workstation-controller.service';

@Component({
  selector: 'app-hmi-recipe',
  templateUrl: './hmi-recipe.component.html',
  styleUrls: ['./hmi-recipe.component.scss']
})
export class HmiRecipeComponent implements OnInit {
  workstations: Workstation[] = [];

  constructor(
    private db: WorkstationControllerService
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

  downloadCSV() {
    console.log("hep !!!");
  }

}
