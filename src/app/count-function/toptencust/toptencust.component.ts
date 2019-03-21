import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

import { Customer } from './customer.model';
import { MessageService } from '../../message.service';
import { Chart } from 'chart.js';
import { ToptencustService } from './toptencust.service';

@Component({
  selector: 'app-toptencust',
  templateUrl: './toptencust.component.html',
  styleUrls: ['./toptencust.component.css']
})
export class ToptencustComponent implements OnInit, AfterViewInit {
  @ViewChild('myTopTenCustomerChart')
  myTopTenCustomerChart: ElementRef;
  topTenCustArray: Customer[];
  chartCustDataSubstring: Array<any>;
  chartCustLabelSubstring: Array<any>;
  chartCustData: Array<any> = [
    {
      data: this.chartCustDataSubstring,
      label: 'Exceptions by Customer'
    }
  ];
  chartCustLabels: Array<any> = [this.chartCustLabelSubstring];
  isLoading = true;
  serviceDown = false;

  constructor(
    private topTenCustService: ToptencustService,
    private message: MessageService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.buildChart();
  }

  buildChart(): void {
    const response1 = this.topTenCustService.getTopTenCustArray().subscribe(
      topTenCustArray => {
        this.topTenCustArray = topTenCustArray;
        this.setUpTopTenCustChart();
      },
      error => {
        this.serviceDown = true;
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  setCountLabels(item, index) {
    const chartTopTenLabels = [item.customerName];
    return chartTopTenLabels;
  }

  setCountData(item, index) {
    const chartTopTenData = [item.exceptionCount];
    return chartTopTenData;
  }

  setUpTopTenCustChart() {
    this.myTopTenCustomerChart = new Chart(
      this.myTopTenCustomerChart.nativeElement.getContext('2d'),
      {
        type: 'bar',
        data: {
          labels: this.topTenCustArray.map(this.setCountLabels),
        datasets: [
          {
            label: 'Customer count',
            backgroundColor: 'rgba(51, 204, 51, .73)',
            borderColor: 'rgba(51, 204, 51, 0.33)',
            data: this.topTenCustArray.map(this.setCountData),
            fill: false
          }
        ],
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Chart.js Line Chart'
          },
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
                display: true
              }
            ]
          }
        }
      }
    }
  );
}
}
