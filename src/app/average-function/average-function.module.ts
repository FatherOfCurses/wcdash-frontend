// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Plugins
import { MyDateRangePickerModule } from 'mydaterangepicker';

// Components
import { AverageHandlingTimeComponent } from './averageHandlingTime/averageHandlingTime.component';

// Services


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyDateRangePickerModule
  ],
  declarations: [AverageHandlingTimeComponent],
  exports: [ AverageHandlingTimeComponent ]
})
export class AverageFunctionModule { }
