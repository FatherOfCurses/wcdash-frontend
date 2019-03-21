import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { IMyDrpOptions } from 'mydaterangepicker';
import { DateHandlerService } from './date-handler.service';

@Injectable()
export class DatePickerService {

  constructor(date: DateHandlerService) { }

  setDatePicker(): IMyDrpOptions {
    const myDateRangePickerOptions: IMyDrpOptions = {
      showSelectDateText: true,
      dateFormat: 'mm/dd/yyyy',
      disableSince: {
        year: Number(moment().format('YYYY')),
        month: Number(moment().format('M')),
        day: Number(moment().format('DD'))
      }
    };
    return myDateRangePickerOptions;
  }
}
