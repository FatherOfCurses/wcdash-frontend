import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AverageHandlingTimeComponent } from './average-function/averageHandlingTime/averageHandlingTime.component';
import { TransactioncountComponent } from './count-function/transactioncount/transactioncount.component';
import { ToptenreasonComponent } from './count-function/toptenreason/toptenreason.component';
import { ToptencustComponent } from './count-function/toptencust/toptencust.component';
import { CompvsexecComponent } from './app-utilities/compvsexec/compvsexec.component';
import { HourlyComponent } from './app-utilities/hourly/hourly.component';
import { DailyvolumeComponent } from './app-utilities/dailyvolume/dailyvolume.component';
import { CountFunctionModule } from './count-function/count-function.module';
import { AverageFunctionModule } from './average-function/average-function.module';
import { PercentFunctionModule } from './percent-function/percent-function.module';

const routes: Routes = [
  { path : 'aht', component: AverageHandlingTimeComponent },
  { path : 'transactioncount', component: TransactioncountComponent},
  { path : 'toptenreasons', component: ToptenreasonComponent},
  { path : 'toptencust', component: ToptencustComponent},
  { path : '', redirectTo: '/', pathMatch: 'full'},
  { path : 'compvsexec', component: CompvsexecComponent},
  { path : 'hourly', component: HourlyComponent},
  { path : 'dailyvolume', component: DailyvolumeComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    RouterModule.forChild(routes),
    CountFunctionModule,
    AverageFunctionModule,
    PercentFunctionModule
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
