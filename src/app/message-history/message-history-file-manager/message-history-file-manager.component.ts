import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MessageHistoryFileControllerService } from '../../api/services';
import { FilterService } from '../../filter/filter.service';
import { ConfigService } from '../../config.service';
import { ApiConfiguration } from '../../api/api-configuration';

@Component({
  selector: 'app-message-history-file-manager',
  templateUrl: './message-history-file-manager.component.html',
  styleUrls: ['./message-history-file-manager.component.scss']
})
export class MessageHistoryFileManagerComponent implements OnInit {
  files: string[] = [];
  url: string = "";
  dateFilter: string = "";
  sequencer: number = 0;
  filter: any = {};

  setDateFilter(d: Date) {
    this.dateFilter = [
      d.getFullYear().toString(),
      (d.getMonth() + 1).toString().padStart(2, "0"),
      d.getDate().toString().padStart(2, "0")
    ].join("-");
  }
  setDateToday() {
    this.setDateFilter(new Date());
  }
  setDateYesterday() {
    let d: Date = new Date();
    d.setDate(d.getDate() - 1);
    this.setDateFilter(d);
  }
  async createCSVFile(event) {
    this.sequencer = 1;
    const dateTmp: string = this.dateFilter.split("-").reverse().join("/");
    this.filter = `operation: alea; jour: ${dateTmp};`;
    this._filter.updateFilterString(this.filter);
  }
  async createCSVFileRequest(filter: any) {
    let snackMessage = "";
    let snackOptions: MatSnackBarConfig = {
      duration: this._config.SNACKBAR_TIMEOUT_TIME
    }
    try{
      const resp = await this.db.createDivaltoExport$Response({
        filter: JSON.stringify({
          where: filter
        })
      }).toPromise();
      switch(resp.status) {
        case 200:
          snackMessage = `${resp.body.filename} créé avec succès :-)`;
          break;

        case 204:
          snackMessage = `Status ${resp.status}: ${resp.statusText} - filtre trop restrictif.`;
          snackOptions.panelClass = ["mat-toolbar", "mat-accent"];
      }
    }catch(e){
      snackMessage = `Error ${e.status}: ${e.statusText} - Une erreur s'est produite...`;
      snackOptions.panelClass = ["mat-toolbar", "mat-warn"];
    }
    this._snackBar.open(snackMessage, "X", snackOptions);
    this.getFileList();
    this.sequencer = 0;
  }

  constructor(
    private db: MessageHistoryFileControllerService,
    private _filter: FilterService,
    private _config: ConfigService,
    private apiConfig: ApiConfiguration,
    private _snackBar: MatSnackBar
  ) {
    this._filter.where.subscribe(
      data => {
        switch(this.sequencer) {
          case 1:
            this.createCSVFileRequest(data);
            break;
          
          default:
            this.sequencer = 0;
            break;
        }
      }
    );
  }

  ngOnInit(): void {
    this.url = this.apiConfig.rootUrl;
    this.getFileList();
  }

  async getFileList() {
    try{
      this.files = await this.db.getFileList().toPromise();
    }catch(e){
      console.log(e);
    }
  }

  async deleteFile(event) {
    if (!event || event.length <= 0) return;
    if (!confirm(
      `Voulez-vous vraiment supprimer définitivement le fichier ${event} ?`
    )) return;
    let snackMessage = "";
    let snackOptions: MatSnackBarConfig = {
      duration: this._config.SNACKBAR_TIMEOUT_TIME
    }
    try{
      this.files = await this.db.deleteFile({
        filename: event
      }).toPromise();
      snackMessage = `Fichier ${event} supprimé.`;
    }catch(e) {
      snackMessage = "Une erreur s'est produite lors de la suppression.";
      snackOptions.panelClass = ["mat-toolbar", "mat-warn"];
    }
    this._snackBar.open(snackMessage, "X", snackOptions);
  }

}
