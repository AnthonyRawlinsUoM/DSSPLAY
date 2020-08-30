import { Component, OnInit, Input } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartConfiguration, ChartData } from 'chart.js';
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

    chart: Chart;
    chartOptions: ChartConfiguration;

    initialData:ChartData = {
        labels: ['1','2','3','4','5','6'],
        datasets: [{
            label: 'Total',
            data: [1, 2, 3, 5, 9.6, 11.9]
        }]
    };


  constructor() {
      super();
  }

  ngOnInit() {

      this.chart = new Chart('linechart', {
          type: 'line',
          data: this.initialData,
          options: {
              legend: {
                  display: true,
                  position: 'top',
                  align: 'start',
                  labels: {
                      boxWidth: 8
                  }
              },
              aspectRatio: 1.0,
              maintainAspectRatio: true
          }
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
