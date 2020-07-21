import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-temporal',
  templateUrl: './temporal.component.html',
  styleUrls: ['./temporal.component.css']
})
export class TemporalComponent implements OnInit {

  chartOptions: ChartConfiguration;

  initialData: any = {
    // define label tree
    labels: ["PB0", "PB1", "PB3", "PB5"],
    datasets: [
      {
        label: "House Loss",
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
        ]
      },
      {
        label: "Life Loss",
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
        ]
      }
    ]
  };
  boxchart: Chart;
  linechart: Chart;
  scatterchart: Chart;
    burnTargets: any;


  constructor() { }

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
            display: true,
            position: 'top',
            align: 'start',
            labels: {
              boxWidth: 16
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

    this.linechart = new Chart('linechart', {

        type: 'line',
        data: this.initialData,
        options: {
            legend: {
            display: true,
            position: 'top',
            align: 'start',
            labels: {
              boxWidth: 16
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
  }

  onBurnTargetChange(evt) {
    console.log('Got new Burn Targets');
      console.log(evt);
    this.burnTargets = evt;

      // evt.map(bt => )
    let tlabels = []
    this.boxchart.data.datasets.map(ds => {
      let tdata = [];

      for(let i=0; i< this.burnTargets.length; i++ ) {
        tdata.push(randomValues(100, 0, 100));
        tlabels.indexOf(this.burnTargets[i].label) === -1 ? tlabels.push(this.burnTargets[i].label) : console.log('.');
      }
      ds.data = tdata;

    });
    this.boxchart.data.labels = tlabels;
    this.boxchart.update();
  }

  onMetricChange(event) {
    console.log('Got new Metrics');
    console.log(event);
    let tlabels = []
    event.map(e => {
      this.boxchart.data.datasets.map(ds => {
        if (e.option === ds.label) {
          // This one active so show data
          let tdata = [];

          for(let i=0; i< this.burnTargets.length; i++ ) {
            tdata.push(randomValues(100, 0, 100));
            tlabels.indexOf(this.burnTargets[i].label) === -1 ? tlabels.push(this.burnTargets[i].label) : console.log('.');
          }
          ds.data = tdata;
        } else {
          // Dataset doesn't exist so add it.
          this.boxchart.data.datasets.push({
            label: e.label,
            backgroundColor: "rgba(0,0,255,0.5)",
            borderColor: "blue",
            borderWidth: 1,
            outlierColor: "#999999",
            padding: 10,
            itemRadius: 0,
            data: [
              randomValues(100, 60, 100)
            ]
          });
        }
      });
    });
    this.boxchart.data.labels = tlabels;

    this.boxchart.update();
  }


}
function randomValues(count, min, max) {
  const delta = max - min;
  return Array.from({ length: count }).map(() => Math.random() * delta + min);
}
