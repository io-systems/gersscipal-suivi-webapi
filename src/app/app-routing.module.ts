import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkshopComponent } from './workshop/workshop.component';
import { WorkstationComponent } from './workstation/workstation.component';
import { OperationComponent } from './operation/operation.component';
import { MessageStandardComponent } from './message-standard/message-standard.component';
import { MessageHistoryComponent } from './message-history/message-history.component';
import { MessageStatusComponent } from './message-status/message-status.component';
import { FabricationOrderComponent } from './fabrication-order/fabrication-order.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MitLicenceComponent } from './mit-licence/mit-licence.component';
import { HmiRecipeComponent } from './hmi-recipe/hmi-recipe.component';

const routes: Routes = [
  {path: "workshop", component: WorkshopComponent},
  {path: "workstation", component: WorkstationComponent},
  {path: "operation", component: OperationComponent},
  {path: "message-standard", component: MessageStandardComponent},
  {path: "message-history", component: MessageHistoryComponent},
  {path: "message-status", component: MessageStatusComponent},
  {path: "fabrication-order", component: FabricationOrderComponent},
  {path: "licence", component: MitLicenceComponent},
  {path: "hmi-recipe", component: HmiRecipeComponent},
  {path: '', redirectTo: 'message-history', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
