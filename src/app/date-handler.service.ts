import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import * as moment from 'moment';

import { MessageService } from './message.service';
import { DateRangeUtilService } from 'mydaterangepicker/dist/services/my-date-range-picker.date.range.util.service';

@Injectable()
export class DateHandlerService {

  dateRange: Array<any>;

  constructor(private message: MessageService) { }

  setDefaultDate(): Observable<String[]> {
    this.dateRange = ['', ''];
    const startDate = moment().subtract(5, 'days').format('YYYY-MM-DD');
    this.log('startDate = ' + startDate);
    const endDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
    this.log('endDate = ' + endDate);
    this.dateRange[1] = startDate;
    this.dateRange[2] = endDate;
    this.log('Default date set to ' + this.dateRange);
    return Observable.of(this.dateRange);
  }

  setDateRange(beginDate: Date, endDate: Date): Observable<String[]> {
    const newStartDate = moment(beginDate.toString()).format('YYYY-MM-DD');
    const newEndDate = moment(endDate.toString()).format('YYYY-MM-DD');
    this.dateRange.push(newStartDate, newEndDate);
    this.log('Date range set to ' + this.dateRange);
    return Observable.of(this.dateRange);
  }

  private log(message: string) {
    this.message.console('Date Handler Service: ' + message);
  }
}
