import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WorkshopEditorComponent } from './workshop-editor/workshop-editor.component';
import { Workshop } from '../api/models/workshop';
import { WorkshopControllerService } from '../api/services/workshop-controller.service';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.scss']
})
export class WorkshopComponent implements OnInit {
  workshops: Workshop[] = [];
  displayedColumns: string[] = ['name', 'description', 'createdAt', 'updatedAt', 'functions'];
  filter: any = {};

  constructor(
    private workshopService: WorkshopControllerService,
    private _bottomSheet: MatBottomSheet,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.resetFilter();
    this.refresh();
  }

  resetFilter(): void {
    this.filter = {
      offset: 0,
      limit: 25
    }
  }

  refresh(): void {
    this.workshopService.find(this.filter).subscribe(
      data => {
        if (this.filter.offset === 0) {
          this.workshops = data;
        }else{
          this.workshops.concat(data);
        }
      },
      err => console.log(err),
      () => {}
    );
  }

  // *************************
  // FONCTIONS D'ÉDITION
  // *************************
  create(): void {
    let newWS: Workshop = {
      name: "",
      description: ""
    }
    const createBottomSheet = this._bottomSheet.open(WorkshopEditorComponent, {
      data: newWS
    });
    createBottomSheet.afterDismissed().subscribe(
      data => {
        if (data) {
          this._snackBar.open("Données mises à jour :-)", "X", {
            duration: 2000
          });
        }
      },
      err => console.log(err),
      () => this.refresh()
    )
  }
  update(uw: Workshop): void {
    const updateBottomSheet = this._bottomSheet.open(WorkshopEditorComponent, {
      data: uw
    });
    updateBottomSheet.afterDismissed().subscribe(
      data => {
        if (data) {
          this._snackBar.open("Données mises à jour :-)", "X", {
            duration: 2000
          });
        }
      },
      err => console.log(err),
      () => this.refresh()
    )
  }
  copy(uw: Workshop): void {
    console.log(uw);
  }
  delete(dw: Workshop): void {
    console.log(dw);
  }

}
