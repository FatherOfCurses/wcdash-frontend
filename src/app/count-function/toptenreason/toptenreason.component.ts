import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Input
} from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';

import { MessageService } from '../../message.service';
import { Chart } from 'chart.js';
import { ToptenreasonService } from './toptenreason.service';
import { ExceptionReason } from './exceptionreason.model';
import { IMyDrpOptions, IMyDateRangeModel } from 'mydaterangepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-toptenreason',
  templateUrl: './toptenreason.component.html',
  styleUrls: ['./toptenreason.component.css']
})
export class ToptenreasonComponent implements OnInit, AfterViewInit {
  @ViewChild('myTopTenReasonsChart')
  myTopTenReasonsChart: ElementRef;
  exceptionReason: ExceptionReason;
  topTenReasonsArray: ExceptionReason[];
  tableReasonTitle;
  tableUrl: String;
  tableReasonHeaderSubstring;
  tableReasonDataSubstring;
  chartReasonDataSubstring;
  chartReasonLabelSubstring: Array<any>;
  newStartDate;
  newEndDate: any;
  chartReasonData = [
    {
      data: this.chartReasonDataSubstring,
      label: 'Count of Exception Reasons'
    }
  ];
  chartCustLabels: Array<any> = [this.chartReasonLabelSubstring];
  isLoading = true;
  serviceDown = false;
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
  topTenDateRange: any = {
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

  // ag-grid
  columnDefs = [
    { headerName: 'Number', field: 'indexNumber', width: 85 },
    { headerName: 'Reason', field: 'elementName', width: 430 },
    { headerName: 'Count', field: 'elementCount', width: 83 }
  ];
  rowData = [];

  constructor(
    private topTenReasonService: ToptenreasonService,
    private message: MessageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      // Empty string means no initial value. Can be also specific date range for example:
      // {beginDate: {year: 2018, month: 10, day: 9}, endDate: {year: 2018, month: 10, day: 19}}
      // which sets this date range to initial value. It is also possible to set initial
      // value using the selDateRange attribute.

      myDateRange: [this.topTenDateRange, Validators.required]
      // other controls are ...
    });
  }

  ngAfterViewInit() {
    this.getTopTenReasonsArray(this.rangeStartDate, this.rangeEndDate);
  }

  getTopTenReasonsArray(rangeStartDate, rangeEndDate): void {
    this.topTenReasonService
      .getTopTenExceptionReasonArray(this.rangeStartDate, this.rangeEndDate)
      .subscribe(
        topTenReasonsArray => {
          this.topTenReasonsArray = topTenReasonsArray;
          this.setUpTopTenReasonsChart();
          this.setUpReasonsTable();
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

  setReasonLabels(item, index) {
    const chartReasonLabels = [item.indexNumber];
    return chartReasonLabels;
  }

  setReasonData(item, index) {
    const chartReasonData = [item.elementCount];
    return chartReasonData;
  }

  setUpTopTenReasonsChart() {
    this.myTopTenReasonsChart = new Chart(
      this.myTopTenReasonsChart.nativeElement.getContext('2d'),
      {
        type: 'bar',
        data: {
          labels: this.topTenReasonsArray.map(this.setReasonLabels),
          datasets: [
            {
              label: 'Exception count',
              backgroundColor: 'rgba(51, 204, 51, .55)',
              borderColor: 'rgba(51, 204, 51, 0.73)',
              data: this.topTenReasonsArray.map(this.setReasonData),
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
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
                  labelString: 'Number of Transactions'
                },
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      }
    );
  }

  onDateRangeChanged(event: IMyDateRangeModel) {
    this.log(this.topTenDateRange.toString());
    this.newStartDate = moment(event.beginJsDate.toString()).format(
      'YYYY-MM-DD'
    );
    this.newEndDate = moment(event.endJsDate.toString()).format('YYYY-MM-DD');
    this.getTopTenReasonsArray(this.newStartDate, this.newEndDate);
  }
  setUpReasonsTable(): void {
    this.rowData = JSON.parse(JSON.stringify(this.topTenReasonsArray));
  }

  private log(message: string) {
    this.message.console('Top Ten Reason Component: ' + message);
  }
}
