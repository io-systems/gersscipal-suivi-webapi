import { Component, OnInit } from '@angular/core';
import { HmiRecipeFileControllerService } from '../../api/services';
import { ApiConfiguration } from '../../api/api-configuration';

@Component({
  selector: 'app-recipe-file-manager',
  templateUrl: './recipe-file-manager.component.html',
  styleUrls: ['./recipe-file-manager.component.scss']
})
export class RecipeFileManagerComponent implements OnInit {
  files: string[] = [];
  url: string = "";

  constructor(
    private db: HmiRecipeFileControllerService,
    private apiConfig: ApiConfiguration
  ) { }
  ngOnInit(): void {
    this.url = this.apiConfig.rootUrl;
    this.refresh();
  }

  async refresh() {
    this.files = await this.db.getFileList().toPromise();
  }

  async deleteFile(event) {
    if (!event || event.length <= 0) return;
    if (!confirm(
      `Voulez-vous vraiment supprimer définitivement le fichier ${event} ?`
    )) return;
    this.files = await this.db.deleteFile({
      filename: event
    }).toPromise();
  }

}
