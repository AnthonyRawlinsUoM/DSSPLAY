import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BurnTarget } from '../burn-target-options/burn-target-options.component';
import { Metric } from '../metrics/metrics.component';
import { DataFrame } from 'data-forge';
import { DfConsumerDirective } from '../df-consumer.directive';
// import { DataFrameConsumer } from '../data-frame-consumer';



function randomValues(count, min, max) {
  const delta = max - min;
  return Array.from({ length: count }).map(() => Math.random() * delta + min);
}

@Component({
    selector: 'app-boxplot',
    templateUrl: './boxplot.component.html',
    styleUrls: ['./boxplot.component.css']
})
export class BoxplotComponent extends DfConsumerDirective implements OnInit, AfterViewInit {
    @Input() results: DataFrame;
    @Input() boxplotName;
    @Input() baseColor;

    chart: Chart;
    chartOptions: ChartConfiguration;

    initialData = {
    // define label tree
    labels: ['1','2','3','4','5','6','7','8','9','10'],
    datasets: [
      {
        label: "WF",
        backgroundColor: "rgba(255,0,0,0.5)",
        borderColor: "red",
        borderWidth: 1,
        outlierColor: "#999999",
        padding: 10,
        itemRadius: 0,
        data: [
          randomValues(100, 0, 100),
          randomValues(100, 0, 20),
          randomValues(100, 20, 70),
          randomValues(100, 60, 100),
          randomValues(40, 50, 100),
          randomValues(100, 60, 120),
          randomValues(100, 80, 100),
          randomValues(40, 50, 100),
          randomValues(100, 60, 120),
          randomValues(100, 80, 100)
        ]
      },
      {
        label: "PB",
        backgroundColor: "rgba(0,0,255,0.5)",
        borderColor: "blue",
        borderWidth: 1,
        outlierColor: "#999999",
        padding: 10,
        itemRadius: 0,
        data: [
          randomValues(100, 60, 100),
          randomValues(100, 0, 100),
          randomValues(100, 0, 20),
          randomValues(100, 20, 70),
          randomValues(40, 60, 120),
          randomValues(100, 20, 100),
          randomValues(100, 80, 100),
          randomValues(40, 50, 100),
          randomValues(100, 60, 120),
          randomValues(100, 80, 100)
        ]
      }
    ]
  };

  options = {
    legend: {
      position: "top"
    }
  };

    constructor() {
        super();
    }

    ngOnInit() {
        this.chart = new Chart('boxplot', {

            type: 'boxplot',
            data: this.initialData,
            options: {
                legend: {
                    display: true,
                    position: 'bottom',
                    align: 'center',
                    labels: {
                        boxWidth: 8
                    }
                },

                aspectRatio: 1.0,
                maintainAspectRatio: true,
                scales: {
                    xAxes: [{
                        gridLines: {
                            offsetGridLines: true
                        }
                    }],
                    yAxes: [{
                        position: 'left',
                        ticks: {
                            beginAtZero: true,
                            suggestedMin: 0,
                            suggestedMax: 100,
                            stepSize: 10
                        }
                    }]
                }
            }
        });
    }

    ngAfterViewInit() {
        console.log('#'+this.boxplotName);



        this.refreshChart();
    }

    refreshChart() {
        console.log('Refreshing charts');
        // if (this.results.length > 0) {
        //     console.log(this.results);
        // }
        this.chart.update();
    }

}
