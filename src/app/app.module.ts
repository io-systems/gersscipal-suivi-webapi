import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';

import { DataTableEditorComponent } from './data-table-editor/data-table-editor.component';
import { FabricationOrderComponent } from './fabrication-order/fabrication-order.component';
import { FabricationOrderEditorComponent } from './fabrication-order/fabrication-order-editor/fabrication-order-editor.component';
import { FabricationOrderBottomsheetEditorComponent } from './fabrication-order/fabrication-order-bottomsheet-editor/fabrication-order-bottomsheet-editor.component';
import { FabricationOrderSelectorComponent } from './fabrication-order/fabrication-order-selector/fabrication-order-selector.component';
import { FilterEditorComponent } from './filter/filter-editor/filter-editor.component';
import { FilterHelperComponent } from './filter/filter-helper/filter-helper.component';
import { FilterHelperDialogComponent } from './filter/filter-helper-dialog/filter-helper-dialog.component';
import { MessageHistoryComponent } from './message-history/message-history.component';
import { MessageHistoryBottomsheetEditorComponent } from './message-history/message-history-bottomsheet-editor/message-history-bottomsheet-editor.component';
import { MessageHistoryEditorComponent } from './message-history/message-history-editor/message-history-editor.component';
import { MessageHistorySelectorComponent } from './message-history/message-history-selector/message-history-selector.component';
import { MessageStandardComponent } from './message-standard/message-standard.component';
import { MessageStandardBottomsheetEditorComponent } from './message-standard/message-standard-bottomsheet-editor/message-standard-bottomsheet-editor.component';
import { MessageStandardEditorComponent } from './message-standard/message-standard-editor/message-standard-editor.component';
import { MessageStandardSelectorComponent } from './message-standard/message-standard-selector/message-standard-selector.component';
import { MessageStatusComponent } from './message-status/message-status.component';
import { MessageStatusBottomsheetEditorComponent } from './message-status/message-status-bottomsheet-editor/message-status-bottomsheet-editor.component';
import { MessageStatusEditorComponent } from './message-status/message-status-editor/message-status-editor.component';
import { MessageStatusSelectorComponent } from './message-status/message-status-selector/message-status-selector.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { OperationComponent } from './operation/operation.component';
import { OperationEditorComponent } from './operation/operation-editor/operation-editor.component';
import { OperationBottomsheetEditorComponent } from './operation/operation-bottomsheet-editor/operation-bottomsheet-editor.component';
import { OperationSelectorComponent } from './operation/operation-selector/operation-selector.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WorkshopComponent } from './workshop/workshop.component';
import { WorkshopEditorComponent } from './workshop/workshop-editor/workshop-editor.component';
import { WorkshopBottomsheetEditorComponent } from './workshop/workshop-bottomsheet-editor/workshop-bottomsheet-editor.component';
import { WorkshopSelectorComponent } from './workshop/workshop-selector/workshop-selector.component';
import { WorkstationEditorComponent } from './workstation/workstation-editor/workstation-editor.component';
import { WorkstationBottomsheetEditorComponent } from './workstation/workstation-bottomsheet-editor/workstation-bottomsheet-editor.component';
import { WorkstationSelectorComponent } from './workstation/workstation-selector/workstation-selector.component';
import { WorkstationComponent } from './workstation/workstation.component';
import { ProgressBarComponent } from './indicators/progress-bar/progress-bar.component';
import { AppLinksComponent } from './indicators/app-links/app-links.component';
import { MitLicenceComponent } from './mit-licence/mit-licence.component';
import { HmiRecipeComponent } from './hmi-recipe/hmi-recipe.component';
import { HmiRecipeEditorComponent } from './hmi-recipe/hmi-recipe-editor/hmi-recipe-editor.component';
import { OperationCachedAutocompleteComponent } from './operation/operation-cached-autocomplete/operation-cached-autocomplete.component';
import { MessageStandardCachedAutocompleteComponent } from './message-standard/message-standard-cached-autocomplete/message-standard-cached-autocomplete.component';
import { HmiRecipeFormComponent } from './hmi-recipe/hmi-recipe-form/hmi-recipe-form.component';
import { HmiRecipeBottomsheetFormComponent } from './hmi-recipe/hmi-recipe-bottomsheet-form/hmi-recipe-bottomsheet-form.component';
import { RecipeFileManagerComponent } from './hmi-recipe/recipe-file-manager/recipe-file-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    DataTableEditorComponent,
    FabricationOrderComponent,
    FabricationOrderEditorComponent,
    FabricationOrderBottomsheetEditorComponent,
    FabricationOrderSelectorComponent,
    FilterEditorComponent,
    FilterHelperComponent,
    FilterHelperDialogComponent,
    MessageHistoryComponent,
    MessageHistoryBottomsheetEditorComponent,
    MessageHistoryEditorComponent,
    MessageHistorySelectorComponent,
    MessageStandardComponent,
    MessageStandardBottomsheetEditorComponent,
    MessageStandardEditorComponent,
    MessageStandardSelectorComponent,
    MessageStatusComponent,
    MessageStatusBottomsheetEditorComponent,
    MessageStatusEditorComponent,
    MessageStatusSelectorComponent,
    NavMenuComponent,
    OperationComponent,
    OperationEditorComponent,
    OperationBottomsheetEditorComponent,
    OperationSelectorComponent,
    PageNotFoundComponent,
    WorkshopComponent,
    WorkshopEditorComponent,
    WorkshopBottomsheetEditorComponent,
    WorkshopSelectorComponent,
    WorkstationComponent,
    WorkstationEditorComponent,
    WorkstationBottomsheetEditorComponent,
    WorkstationSelectorComponent,
    ProgressBarComponent,
    AppLinksComponent,
    MitLicenceComponent,
    HmiRecipeComponent,
    HmiRecipeEditorComponent,
    OperationCachedAutocompleteComponent,
    MessageStandardCachedAutocompleteComponent,
    HmiRecipeFormComponent,
    HmiRecipeBottomsheetFormComponent,
    RecipeFileManagerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatAutocompleteModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
