import { Component, OnInit, Input,AfterViewInit } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartConfiguration, ChartData, PositionType } from 'chart.js';
import { DataFrame } from 'data-forge';
import * as pd from 'node-pandas';
import { DataFrameConsumer } from '../data-frame-consumer';
import { DfConsumerDirective } from '../df-consumer.directive';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent extends DfConsumerDirective implements OnInit, DataFrameConsumer {
    @Input() dataframe: DataFrame;
    @Input() baseColor;
    @Input() ident;

    chart: Chart;

    initialData = {
        labels: ['1','2','3','4','5','6'],
        datasets: [{
            label: "New Tests",
            borderColor: "#64a789",
            data: [65, 59, 80, 81, 56, 55, 40]
        }]
    };

    initialOptions = {
        legend: {
            display: true,
            labels: {
                boxWidth: 8
            }
        },
        aspectRatio: 1.0,
        maintainAspectRatio: true
    }


  constructor() {
      super();
  }

  ngOnInit() {

      this.chart = new Chart(this.ident, {
          type: 'line',
          data: this.initialData,
          options: this.initialOptions
      });
  }

  onDataframeChange($event) {
      this.isDimmed = true;
      console.log('Results DF changed!');
      this.refreshChart();
  }

  refreshChart() {
      console.log('Refreshing charts');
      // if (this.results.length > 0) {
      //     console.log(this.results);
      // }
      this.chart.update();
  }

  hueSkew(step) {
      // Generate secondary colors based on original
      // by slightly randomising HSV values
      // TODO
      return this.baseColor;
  }

}
