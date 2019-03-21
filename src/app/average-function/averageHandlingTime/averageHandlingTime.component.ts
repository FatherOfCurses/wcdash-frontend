import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { CompleteTrans } from '../../count-function/transactioncount/completetrans.model';
import { CompleteTransService } from '../../completetrans.service';
import { MessageService } from '../../message.service';
import { Chart } from 'chart.js';
import { ExceptionTrans } from '../../count-function/transactioncount/exceptiontrans.model';
import { ExceptionTransService } from '../../exceptiontrans.service';
import { Observable } from 'rxjs/Observable';
import { IMyDrpOptions, IMyDateRangeModel } from 'mydaterangepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/observable/forkJoin';
import * as moment from 'moment';

@Component({
  selector: 'app-aht',
  templateUrl: './averageHandlingTime.component.html',
  styleUrls: ['./averageHandlingTime.component.css']
})
export class AverageHandlingTimeComponent implements OnInit {
  @ViewChild('myChart')
  myChart: ElementRef;
  selectedCompleteTrans: CompleteTrans;
  completeTransArray: CompleteTrans[];
  exceptionTransArray: ExceptionTrans[];
  chartDataSubstring;
  chartLabelsSubstring: Array<any>;
  newStartDate;
  newEndDate: any;
  chartData: Array<any> = [
    {
      data: this.chartDataSubstring,
      label: 'Transaction Time'
    }
  ];
  chartLabels: Array<any> = [this.chartLabelsSubstring];
  serviceDown = false;
  isLoading = true;
  myDateRangePickerOptions: IMyDrpOptions = {
    showSelectDateText: true,
    dateFormat: 'mm/dd/yyyy',
    disableSince: {
      year: Number(moment().format('YYYY')),
      month: Number(moment().format('M')),
      day: Number(moment().format('DD'))
    }
  };
  myForm: FormGroup;
  // default view when starting is last five days
  rangeStartDate = moment()
    .subtract(5, 'days')
    .format('YYYY-MM-DD');
  rangeEndDate = moment()
    .subtract(1, 'days')
    .format('YYYY-MM-DD');
  @Input()
  dateRange: any = {
    beginDate: {
      year: moment().format('YYYY'),
      month: moment().format('M'),
      day: moment()
        .subtract(5, 'days')
        .format('DD')
    },
    endDate: {
      year: moment().format('YYYY'),
      month: moment().format('M'),
      day: moment()
        .subtract(1, 'days')
        .format('DD')
    }
  };

  constructor(
    private completeService: CompleteTransService,
    private exceptionService: ExceptionTransService,
    private message: MessageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      // Empty string means no initial value. Can be also specific date range for example:
      // {beginDate: {year: 2018, month: 10, day: 9}, endDate: {year: 2018, month: 10, day: 19}}
      // which sets this date range to initial value. It is also possible to set initial
      // value using the selDateRange attribute.

      myDateRange: [this.dateRange, Validators.required]
      // other controls are ...
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.requestExceptionDataFromMultipleSources(
      this.rangeStartDate,
      this.rangeEndDate
    );
  }

  requestExceptionDataFromMultipleSources(rangeStartDate, rangeEndDate): void {
    const response1 = this.exceptionService.getExceptionTransArray(
      rangeStartDate,
      rangeEndDate
    );
    const response2 = this.completeService.getCompleteTransArray(
      rangeStartDate,
      rangeEndDate
    );
    Observable.forkJoin([response1, response2]).subscribe(
      responseList => {
        this.exceptionTransArray = responseList[0];
        this.completeTransArray = responseList[1];
        this.setUpChart();
      },
      error => {
        this.serviceDown = true;
        this.isLoading = false;
        this.log(
          'Error from requestExceptionDataFromMultipleSources: ' + error
        );
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  setLabels(item, index) {
    const chartLabels = [item.summaryDate];
    return chartLabels;
  }

  setData(item, index) {
    const chartData = [item.dailyAverageWorkTime];
    return chartData;
  }

  setUpChart() {
    this.myChart = new Chart(this.myChart.nativeElement.getContext('2d'), {
      type: 'line',
      data: {
        labels: this.completeTransArray.map(this.setLabels),
        datasets: [
          {
            label: 'Completed',
            backgroundColor: 'rgba(51, 204, 51, .73)',
            borderColor: 'rgba(51, 204, 51, 0.33)',
            data: this.completeTransArray.map(this.setData),
            fill: false,
            cubicInterpolationMode: 'monotone'
          },
          {
            label: 'Exception',
            backgroundColor: 'rgba(195, 59, 62, .73)',
            borderColor: 'rgba(195, 59, 62, 0.33)',
            data: this.exceptionTransArray.map(this.setData),
            fill: false
          }
        ]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
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
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Seconds'
              }
            }
          ]
        }
      }
    });
  }

  onDateRangeChanged(event: IMyDateRangeModel) {
    this.log(this.dateRange.toString());
    this.newStartDate = moment(event.beginJsDate.toString()).format(
      'YYYY-MM-DD'
    );
    this.newEndDate = moment(event.endJsDate.toString()).format('YYYY-MM-DD');
    this.requestExceptionDataFromMultipleSources(
      this.newStartDate,
      this.newEndDate
    );
  }
  onSelect(completeTrans: CompleteTrans): void {
    this.selectedCompleteTrans = completeTrans;
  }

  private log(message: string) {
    this.message.console('AHT Component: ' + message);
  }
}
