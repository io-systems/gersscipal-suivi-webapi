import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';

import { WorkshopComponent } from './workshop/workshop.component';
import { WorkstationComponent } from './workstation/workstation.component';
import { OperationComponent } from './operation/operation.component';
import { MessageStandardComponent } from './message-standard/message-standard.component';
import { MessageHistoryComponent } from './message-history/message-history.component';
import { MessageStatusComponent } from './message-status/message-status.component';
import { FabricationOrderComponent } from './fabrication-order/fabrication-order.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WorkshopEditorComponent } from './workshop/workshop-editor/workshop-editor.component';
import { WorkshopBottomsheetEditorComponent } from './workshop/workshop-bottomsheet-editor/workshop-bottomsheet-editor.component';
import { WorkshopSelectorComponent } from './workshop/workshop-selector/workshop-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkshopComponent,
    WorkstationComponent,
    OperationComponent,
    MessageStandardComponent,
    MessageHistoryComponent,
    MessageStatusComponent,
    FabricationOrderComponent,
    PageNotFoundComponent,
    WorkshopEditorComponent,
    WorkshopBottomsheetEditorComponent,
    WorkshopSelectorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
