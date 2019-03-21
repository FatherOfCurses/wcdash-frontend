import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/observable/forkJoin';

import { CompleteTrans } from './completetrans.model';
import { ExceptionTrans } from './exceptiontrans.model';

import { CompleteTransService } from '../../completetrans.service';
import { DateHandlerService } from '../../date-handler.service';
import { ExceptionTransService } from '../../exceptiontrans.service';
import { MessageService } from '../../message.service';

import { Chart } from 'chart.js';
import { IMyDateRangeModel } from 'mydaterangepicker';

@Component({
  selector: 'app-transactioncount',
  templateUrl: './transactioncount.component.html',
  styleUrls: ['./transactioncount.component.css']
})
export class TransactioncountComponent implements OnInit, AfterViewInit {
  @ViewChild('myTransCountChart')
  myTransCountChart: ElementRef;
  completeTransCountArray: CompleteTrans[];
  exceptionTransCountArray: ExceptionTrans[];
  chartCountDataSubstring;
  chartCountLabelSubstring;
  dateRange: Array<any>;
  chartCountData: Array<any> = [
    {
      data: this.chartCountDataSubstring,
      label: 'Transaction Count'
    }
  ];
  chartCountLabels: Array<any> = [this.chartCountLabelSubstring];
  myForm: FormGroup;
  isLoading = true;
  serviceDown = false;

  constructor(
    private completeService: CompleteTransService,
    private exceptionService: ExceptionTransService,
    private message: MessageService,
    private date: DateHandlerService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      // Empty string means no initial value. Can be also specific date range for example:
      // {beginDate: {year: 2018, month: 10, day: 9}, endDate: {year: 2018, month: 10, day: 19}}
      // which sets this date range to initial value. It is also possible to set initial
      // value using the selDateRange attribute.

      myDateRange: [this.date.setDefaultDate(), Validators.required]
      // other controls are ...
    });
  }

  ngAfterViewInit() {
    this.requestDataFromMultipleSources(this.date.setDefaultDate());
  }

  // Rename this function?
  requestDataFromMultipleSources(dateRange): void {
    const response1 = this.exceptionService.getExceptionTransArray(
      this.dateRange[1].value,
      this.dateRange[2].value
    );
    const response2 = this.completeService.getCompleteTransArray(
      this.dateRange[1].value,
      this.dateRange[2].value
    );
    Observable.forkJoin([response1, response2]).subscribe(
      responseList => {
        this.exceptionTransCountArray = responseList[0];
        this.completeTransCountArray = responseList[1];
        this.setUpCountChart();
      },
      error => {
        this.serviceDown = true;
        this.isLoading = false;
        this.log('Error from requestExceptionDataFromMultipleSources: ' + error);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  setCountLabels(item, index) {
    const chartCountLabels = [item.summaryDate];
    return chartCountLabels;
  }

  setCountData(item, index) {
    const chartCountData = [item.numberOfTransactions];
    return chartCountData;
  }

  setUpCountChart() {
    this.myTransCountChart = new Chart(
      this.myTransCountChart.nativeElement.getContext('2d'),
      {
        type: 'bar',
        data: {
          labels: this.completeTransCountArray.map(this.setCountLabels),
          datasets: [
            {
              stack: 'Stack 0',
              label: 'Completed',
              backgroundColor: 'rgba(51, 204, 51, .73)',
              borderColor: 'rgba(51, 204, 51, 0.33)',
              data: this.completeTransCountArray.map(this.setCountData),
              fill: false
            },
            {
              stack: 'Stack 0',
              label: 'Exception',
              backgroundColor: 'rgba(195, 59, 62, .73)',
              borderColor: 'rgba(195, 59, 62, 0.33)',
              data: this.exceptionTransCountArray.map(this.setCountData),
              fill: false
            }
          ]},
          options: {
            responsive: true,
            tooltips: {
              mode: 'index',
              intersect: false
            },
            hover: {
              mode: 'nearest',
              intersect: true
            },
            scales: {
              xAxes: [
                {
                  display: true
                }
              ],
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: 'Number of Transactions'
                  },
                  display: true
                }
              ]
            }
          }
      }
    );
  }

  onDateRangeChanged(event: IMyDateRangeModel) {
    this.date.setDateRange(event.beginJsDate, event.endJsDate)
    .subscribe(dateRange => this.dateRange = dateRange);
    this.requestDataFromMultipleSources(this.dateRange);
  }

  private log(message: string) {
    this.message.console('Transaction Count Component: ' + message);
  }

}
