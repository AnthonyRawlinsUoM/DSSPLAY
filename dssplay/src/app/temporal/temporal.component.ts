import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BurnTarget } from '../burn-target-options/burn-target-options.component';
import { Metric, MODE } from '../metrics/metrics.component';

import "chartjs-chart-box-and-violin-plot/build/Chart.BoxPlot.js";
import { DataService } from '../data.service';

@Component({
  selector: 'app-temporal',
  templateUrl: './temporal.component.html',
  styleUrls: ['./temporal.component.css']
})
export class TemporalComponent implements OnInit {

  chartOptions: ChartConfiguration;

  initialData: any = {
    // define label tree
    labels: [],
    datasets: []
  };

  boxchart: Chart;
  linechart: Chart;
  scatterchart: Chart;

  charts: Array<Chart> = [];

  burnTargets: Array<BurnTarget> = [];

  metrics: Array<Metric> = [];

  constructor(private da: DataService) { }

  ngOnInit(): void {
    this.boxchart = new Chart('boxchart', {

        type: 'boxplot',
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
          aspectRatio: 16/9,
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

    this.scatterchart = new Chart('scatterchart', {

        type: 'scatter',
        data: this.initialData,
        options: {
            legend: {
            display: false
          },
          aspectRatio: 16/9,
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

    this.linechart = new Chart('violin', {

        type: 'horizontalViolin',
        data: this.initialData,
        options: {
            legend: {
            display: false
          },
          aspectRatio: 16/9,
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

    this.charts.push(this.linechart);
    this.charts.push(this.boxchart);
    this.charts.push(this.scatterchart);
  }

  onBurnTargetChange(evt) {
    // console.log('Got new Burn Targets');
    // console.log(evt);
    this.burnTargets = evt;
    this.refreshCharts();
  }

  onMetricChange(event) {
    // console.log('Got new Metrics');
    // console.log(event);
    this.metrics = event;
    this.refreshCharts();
  }

  public colorOfMetric(metric) {
    return this.metrics
    .filter(m => m.label === metric)
    .map(m => {
      return m.color;
    });
  }

  public borderColorOfMetric(metric) {
    return this.metrics
    .filter(m => m.label === metric)
    .map(m => {
      return m.border;
    });
  }

  refreshCharts() {

    if(this.metrics.length >0 && this.burnTargets.length > 0) {

    // Every chart...
    for(let c of this.charts) {

      // nullify non-enabled datasets/metrics
      c.data.datasets
      .map(ds => {
        if(ds.label == this.metrics[0].label || ds.label == this.metrics[1].label) {
          ds.data = [];
        }
      });

      // Which do we have?
      let have = c.data.datasets
      .map(ds => {
        return ds.label;
      });
      // console.log('Have: ');
      // console.log(have);

      // Which do we not have?
      let missing = [];
      let active = [];

      this.metrics.map(m => {
        if(have.indexOf(m.label) == -1) {
          missing.push(m.label);
        } else {
          active.push(m);
        }
      });



      if(missing.length > 0) {
        // console.log('Missing items:');
        // console.log(missing);

        let col = 0;

        // Add dataset from template
        missing.map(miss =>{
          let data = [];
          this.burnTargets.map(bt => {
            // Replace with Service call to socket.io server/Postgres
            for(let mt of this.metrics) {
              data.push(randomValues(10, 25, 75));
            }
          });

          // console.log(data);

          c.data.datasets.push({
            label: miss,
            backgroundColor: this.colorOfMetric(miss)[0], // TODO - auto colorize
            borderColor: this.borderColorOfMetric(miss)[0],
            borderWidth: 1,
            // itemRadius: 0.2,
            data: data
          });

          col++;
        });

      }

      let removals = [];

      for (let ds of c.data.datasets) {
        let good = false;
        for(let m of this.metrics) {
          if(ds.label === m.label) {
            good = true;
          }
        }
        if (!good) {
          removals.push(ds);
        }
      }
      c.data.datasets = c.data.datasets.filter((r) => !removals.includes(r));


      // All present now
      c.data.datasets
      .map(ds => {
        let data = [];
        this.burnTargets.map(bt => {
          // Replace with Service call to socket.io server/Postgres

          for(let mt of this.metrics) {
            // console.log(ds.label);
            if(mt.label === ds.label) {
              // console.log('Adding data');
              data.push(randomValues(10, 25, 75));

            }
          }
        });

        // console.log(data);
        ds.data = data;
      });


      // Update labels
      c.data.labels = this.burnTargets
      .map(bt => {
        return bt.label;
      });

      // console.log(c.data.labels);

      c.update();
      }
    }
  }


}
function randomValues(count, min, max) {
  const delta = max - min;
  return Array.from({ length: count }).map(() => Math.random() * delta + min);
}
