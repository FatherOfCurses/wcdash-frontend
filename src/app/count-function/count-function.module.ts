import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Plugins
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { AgGridModule } from 'ag-grid-angular';

// Components
import { CompexecbyhourComponent } from './compexecbyhour/compexecbyhour.component';
import { ToptencustComponent } from './toptencust/toptencust.component';
import { TransactioncountComponent } from './transactioncount/transactioncount.component';
import { ToptenreasonComponent } from './toptenreason/toptenreason.component';

// Services
import { CompleteTransService } from '../completetrans.service';
import { ExceptionTransService } from '../exceptiontrans.service';
import { DateHandlerService } from '../date-handler.service';
import { ToptencustService } from './toptencust/toptencust.service';
import { ToptenreasonService } from './toptenreason/toptenreason.service';

@NgModule({
  imports: [
    AgGridModule,
    CommonModule,
    FormsModule,
    MyDateRangePickerModule
  ],
  providers: [
    DateHandlerService,
    CompleteTransService,
    ExceptionTransService,
    ToptencustService,
    ToptenreasonService
  ],
  declarations: [
    CompexecbyhourComponent,
    ToptencustComponent,
    ToptenreasonComponent,
    TransactioncountComponent
  ],
  exports: [
    CompexecbyhourComponent,
    ToptencustComponent,
    ToptenreasonComponent,
    TransactioncountComponent
  ]
})
export class CountFunctionModule { }
