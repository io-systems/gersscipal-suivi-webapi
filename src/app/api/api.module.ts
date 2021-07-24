/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { AngularDataFilterControllerService } from './services/angular-data-filter-controller.service';
import { CounterControllerService } from './services/counter-controller.service';
import { FabricationOrderControllerService } from './services/fabrication-order-controller.service';
import { HmiRecipeFileControllerService } from './services/hmi-recipe-file-controller.service';
import { HmiRecipeControllerService } from './services/hmi-recipe-controller.service';
import { MessageHistoryControllerService } from './services/message-history-controller.service';
import { MessageHistoryFileControllerService } from './services/message-history-file-controller.service';
import { MessageStandardControllerService } from './services/message-standard-controller.service';
import { MessageStatusControllerService } from './services/message-status-controller.service';
import { OperationControllerService } from './services/operation-controller.service';
import { PingControllerService } from './services/ping-controller.service';
import { ProductivityControllerService } from './services/productivity-controller.service';
import { SchemaControllerService } from './services/schema-controller.service';
import { ShiftScheduleControllerService } from './services/shift-schedule-controller.service';
import { ShiftControllerService } from './services/shift-controller.service';
import { WorkshopControllerService } from './services/workshop-controller.service';
import { WorkstationControllerService } from './services/workstation-controller.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    AngularDataFilterControllerService,
    CounterControllerService,
    FabricationOrderControllerService,
    HmiRecipeFileControllerService,
    HmiRecipeControllerService,
    MessageHistoryControllerService,
    MessageHistoryFileControllerService,
    MessageStandardControllerService,
    MessageStatusControllerService,
    OperationControllerService,
    PingControllerService,
    ProductivityControllerService,
    SchemaControllerService,
    ShiftScheduleControllerService,
    ShiftControllerService,
    WorkshopControllerService,
    WorkstationControllerService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
