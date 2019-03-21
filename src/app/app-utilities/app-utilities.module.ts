import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompvsexecComponent } from './compvsexec/compvsexec.component';
import { DailyvolumeComponent } from './dailyvolume/dailyvolume.component';
import { HourlyComponent } from './hourly/hourly.component';
import { CountFunctionModule } from '../count-function/count-function.module';
import { AverageFunctionModule } from '../average-function/average-function.module';
import { PercentFunctionModule } from '../percent-function/percent-function.module';


@NgModule({
  imports: [
    AverageFunctionModule,
    CommonModule,
    CountFunctionModule,
    PercentFunctionModule
  ],
  declarations: [
    CompvsexecComponent,
    DailyvolumeComponent,
    HourlyComponent
  ]
})
export class AppUtilitiesModule { }
