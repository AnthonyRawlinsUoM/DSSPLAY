import { Component, OnInit, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BurnTarget } from '../burn-target-options/burn-target-options.component';
import { Metric } from '../metrics/metrics.component';

import "chartjs-chart-box-and-violin-plot/build/Chart.BoxPlot.js";
import { DataService } from '../data.service';
import { Map, FitBoundsOptions, LngLatBoundsLike, LngLatBounds, Source } from 'mapbox-gl';
import { MapComponent } from 'ngx-mapbox-gl';
import { filter, map } from 'rxjs/operators';
import { FeatureCollection, Feature, Geometry } from 'geojson';

import { easing } from 'ts-easing';


@Component({
    selector: 'app-unified-report',
    templateUrl: './unified-report.component.html',
    styleUrls: ['./unified-report.component.css']
})
export class UnifiedReportComponent implements OnInit {
    @ViewChild('mapview', { static: false }) mapview: Map;

    @Input() focus?: any = { "type": "FeatureCollection", "features": [] };

    @Output() hoveredStateId = null;
    @Output() selectedAreaId = null;
    @Output() selectedArea = null;
    @Output() boundsChange = new EventEmitter<any>();
    // @Output() metricsChange = new EventEmitter<Array<Metric>>();
    // @Output() burnTargetsChange = new EventEmitter<Array<BurnTarget>>();

    sources: Source[] = [];
    zoom = [7.78];
    bounds: any;
    boundsOptions;
    burnTargets: Array<BurnTarget> = [];
    metrics: Array<Metric> = [];
    boxchart: Chart;
    violin: Chart;
    scatterchart: Chart;
    charts: Array<Chart> = [];
    chartOptions: ChartConfiguration;

    mapviewer?: MapComponent;
    style = "mapbox://styles/anthonyrawlinsuom/ckctrexe332ho1inaqb2ul5x9";

    movingOptions: FitBoundsOptions = { padding: 30, easing: (x) => { return easing.quadratic(x) } };
    initialData: any = {
        // define label tree
        labels: [],
        datasets: []
    };

    show_sidebar = false;

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

      this.violin = new Chart('violin', {

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

      this.charts.push(this.violin);
      this.charts.push(this.boxchart);
      this.refreshCharts({});
    }

    public colorOfMetric(metric:string) {
      return this.metrics
      .filter(m => m.label === metric)
      .map(m => {
        return m.color;
      });
    }

    public borderColorOfMetric(metric:string) {
      return this.metrics
      .filter(m => m.label === metric)
      .map(m => {
        return m.border;
      });
    }

    onBurnTargetsChange(event) {
      this.burnTargets = event;
      this.refreshCharts(event);
    }

    onMetricsChange(event) {
      this.metrics = event;
      this.refreshCharts(event);
    }

    refreshCharts(event) {
      console.log(event);

      if((this.metrics.length > 0 && this.burnTargets.length > 0)) {

          console.log('Redrawing charts!');
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

          let col = 0;

          // Add dataset from template
          missing.map(miss =>{
            let data = [];
            this.burnTargets.map(bt => {
              // TODO - Replace with Service call to socket.io server/Postgres
              for(let mt of this.metrics) {
                data.push(randomValues(10, 25, 75));
              }
            });

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

    onBoundsChange(bounds: LngLatBounds) {
        console.log('Moving!');
        this.bounds = bounds;
    }

    mousemove(evt) {
        console.log(evt);
    }

    mapLoaded(evt) {
        console.log(evt);
    }

}
function randomValues(count, min, max) {
    const delta = max - min;
    return Array.from({ length: count }).map(() => Math.random() * delta + min);
}
