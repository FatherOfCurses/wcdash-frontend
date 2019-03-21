// Core
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

// Plugins
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { AgGridModule } from 'ag-grid-angular';
import { MyDateRangePickerModule } from 'mydaterangepicker';

// Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NavbarComponent } from './app-utilities/navbar/navbar.component';

// Services
import { MessageService } from './message.service';
import { DateHandlerService } from './date-handler.service';

// Sub-Modules
import { AppUtilitiesModule } from './app-utilities/app-utilities.module';
import { AverageFunctionModule } from './average-function/average-function.module';
import { CountFunctionModule } from './count-function/count-function.module';
import { PercentFunctionModule } from './percent-function/percent-function.module';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    AgGridModule.withComponents([]),
    AppRoutingModule,
    AppUtilitiesModule,
    AverageFunctionModule,
    BrowserModule,
    ChartsModule,
    CountFunctionModule,
    FormsModule,
    HttpClientModule,
    MyDateRangePickerModule,
    PercentFunctionModule,
    ReactiveFormsModule
  ],
  providers: [
    MessageService,
    DateHandlerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
