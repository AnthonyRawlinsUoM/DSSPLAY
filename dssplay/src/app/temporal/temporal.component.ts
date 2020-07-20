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
  chart: Chart;


  constructor() { }

  ngOnInit(): void {
    this.chart = new Chart('canvas', {

        type: 'boxplot',
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
          aspectRatio: 4/3,
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
    console.log(evt);
    this.chart.data.datasets.map(ds => {
      ds.data = [
        randomValues(100, 0, 100),
        randomValues(100, 0, 20),
        randomValues(100, 20, 70),
        randomValues(100, 60, 100),
      ]
    });
    this.chart.update();
  }


}
function randomValues(count, min, max) {
  const delta = max - min;
  return Array.from({ length: count }).map(() => Math.random() * delta + min);
}
