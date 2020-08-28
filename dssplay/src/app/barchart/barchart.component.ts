import { Component, OnInit, Input } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BurnTarget } from '../burn-target-options/burn-target-options.component';
import { Metric } from '../metrics/metrics.component';
import DataFrame, { Row } from 'dataframe-js';

import * as pd from 'node-pandas';


@Component({
    selector: 'app-barchart',
    templateUrl: './barchart.component.html',
    styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {
    @Input() dataframe:DataFrame;
    @Input() metrics;
    @Input() burnTargets;
    // @Input() series; // Becomes the column groupings!

    chart: Chart;
    charts: Array<Chart> = [];
    chartOptions: ChartConfiguration;


    initialData: any = {
        // define label tree
        labels: [],
        datasets: [
            {
                label:'WF',
                barPercentage: 0.5,
                barThickness: 'flex',
                backgroundColor: '#99D17B',
                borderColor: '#4D8B31',
                borderWidth: 1,
                minBarLength: 2,
                data: []
            },
            {
                label:'PB',
                barPercentage: 0.5,
                barThickness: 'flex',
                backgroundColor: '#598392',
                borderColor: '#2274a5',
                borderWidth: 1,
                minBarLength: 2,
                data: []
            }
        ]
    };

    constructor() { }

    ngOnInit() {
        console.log('Dataframe:', this.dataframe);

        this.chart = new Chart('chart', {
            type: 'bar',
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
                    aspectRatio: 16 / 9,
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
                            }
                        }]
                    }
                }
        });

        this.charts.push(this.chart);
        this.refreshCharts();
    }

    onDataframeChange(event) {
        console.log('Results DF changed!');
        this.dataframe = event;
        this.refreshCharts();
    }

    refreshCharts() {
        console.log('Refreshing charts');
        console.log(this.dataframe);
        // Example...

        // +---------------------------+
        // |      |  I   |      |      |
        // |      |  I   |  I   |      |
        // |  I   |  I   |  I   |      |
        // |  I   |  I   |  I   |  I   |
        // |  I   |  I   |  I   |  I   |
        // |  ha  |  ha  |  ha  |  ha  |
        // +------+------+------+------+
        // |  PB  |  WF  |  PB  |  WF  |
        // |-------------+-------------|
        // |     PB1     |     PB3     |
        // |---------------------------|

        this.charts.map(c => {
            c.data.labels = ['PB 1', 'PB 3'];
            c.data.datasets[0].data = this.dataframe.where({'Season':'WF'}).toArray();
            c.data.datasets[1].data = this.dataframe.where({'Season':'PB'}).toArray();
            c.update();
        });
    }

}
function fastpivot(a) { "use strict"; var t = {}; if ("string" != typeof a && a.length > 0) { var l = Object.keys(a[0]), n = {}; l.forEach(function(a) { n[a] = {}, n[a]._labels = [], n[a]._labelsdata = [], n[a]._data = {} }), a.forEach(function(a, t) { l.forEach(function(t) { var l = a[t]; n[t]._data[l] = (n[t]._data[l] || 0) + 1, n[t]._labels[l] = null }) }), l.forEach(function(a) { for (var t in n[a]._data) n[a]._labelsdata.push(n[a]._data[t]); n[a]._labels = Object.keys(n[a]._labels) }), t = n } return t }
