import { Component, Input, OnInit } from '@angular/core';
import { SchemaControllerService } from '../../api/services';

@Component({
  selector: 'app-schema-info',
  templateUrl: './schema-info.component.html',
  styleUrls: ['./schema-info.component.scss']
})
export class SchemaInfoComponent implements OnInit {
  @Input() schemaName: string = "";
  schemaFields: any[] = [];
  displayedColumns: string[] = [];

  constructor(
    private db: SchemaControllerService
  ) { }

  ngOnInit() {
    if (this.schemaName.length <= 0) return;
    this.refresh();
  }
  async refresh() {
    this.schemaFields = await this.db.getSchema({
      schema: this.schemaName
    }).toPromise();
    if (this.schemaFields.length <= 0) return;
    this.displayedColumns = Object.keys(this.schemaFields[0]);
  }

}
