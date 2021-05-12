import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MessageStandard } from './api/models/message-standard';
import { MessageStandardControllerService } from './api/services/message-standard-controller.service';
import { Operation } from './api/models/operation';
import { OperationControllerService } from './api/services/operation-controller.service';
import { Workstation }  from './api/models/workstation';
import { WorkstationControllerService } from './api/services/workstation-controller.service';

@Injectable({
  providedIn: 'root'
})
export class AppCacheService {
  public aleas: MessageStandard[] = [];
  public operations: Operation[] = [];
  public workstations: Workstation[] = [];
  public cacheUpdated: Subject<any> = new Subject();

  constructor(
    private operationDB: OperationControllerService,
    private aleaDB: MessageStandardControllerService,
    private wstDB: WorkstationControllerService
  ) {
    this.refreshCache();
  }

  async refreshCache() {
    try{
      this.operations = await this.operationDB.find().toPromise();
      this.aleas = await this.aleaDB.find().toPromise();
      this.workstations = await this.wstDB.find().toPromise();
      this.cacheUpdated.next();
    }catch(e){
      console.log("refreshCache: ", e);
    }
  }
}
