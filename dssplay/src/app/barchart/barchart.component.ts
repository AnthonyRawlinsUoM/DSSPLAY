import { Component, OnInit, Input } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BurnTarget } from '../burn-target-options/burn-target-options.component';
import { Metric } from '../metrics/metrics.component';
import { DataFrame } from 'data-forge';
import * as pd from 'node-pandas';

import { DfConsumerDirective } from '../df-consumer.directive';

@Component({
    selector: 'app-barchart',
    templateUrl: './barchart.component.html',
    styleUrls: ['./barchart.component.css']
})
export class BarchartComponent extends DfConsumerDirective implements OnInit {
    @Input() dataframe: DataFrame;
    @Input() baseColor;
    // @Input() metrics;
    // @Input() burnTargets;
    // @Input() series; // Becomes the column groupings!

    chart: Chart;
    chartOptions: ChartConfiguration;

    initialData: any = {
        // define label tree
        labels: ['WF', 'PB'],
        datasets: [
            {
                label: 'PB 1',
                barPercentage: 0.5,
                barThickness: 'flex',
                backgroundColor: this.hueSkew(1),
                borderColor: this.hueSkew(2),
                borderWidth: 1,
                minBarLength: 2,
                data: [[0, 0, 0], [0, 0, 0]]
            },
            {
                label: 'PB 3',
                barPercentage: 0.5,
                barThickness: 'flex',
                backgroundColor: this.hueSkew(3),
                borderColor: this.hueSkew(4),
                borderWidth: 1,
                minBarLength: 2,
                data: [[0, 0, 0], [0, 0, 0]]
            }
        ]
    };

    constructor() { super(); }

    ngOnInit() {
        // console.log('Dataframe:', this.dataframe.toString());

        this.chart = new Chart('barchart', {
            type: 'bar',
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
                        }
                    }]
                }
            }
        });

        this.refreshChart();
    }

    onDataframeChange($event) {
        console.log('Results DF changed!');
        this.refreshChart();
    }

    refreshChart() {
        console.log('Refreshing chart');
        console.log(this.dataframe.toString());
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

        let uniquePBs = Array.from(new Set(this.dataframe.getSeries('PB').toArray()));
        this.chart.data.labels = uniquePBs;
        let s1 = this.dataframe.where(row => row['FireSeason'] == 'WF').toArray();
        let s2 = this.dataframe.where(row => row['FireSeason'] == 'PB').toArray();

        console.log('S1', s1);
        console.log('S2', s2);
        for(let row of this.dataframe.toRows()) {
            for (let col of row) {
                row[col]
            }
        }
        this.chart.data.datasets[0].data = s1;
        this.chart.data.datasets[1].data = s2;
        this.chart.update();
    }

    hueSkew(step) {
        // Generate secondary colors based on original
        // by slightly randomising HSV values
        // TODO
        return this.baseColor;
    }

}
// function fastpivot(a) { "use strict"; var t = {}; if ("string" != typeof a && a.length > 0) { var l = Object.keys(a[0]), n = {}; l.forEach(function(a) { n[a] = {}, n[a]._labels = [], n[a]._labelsdata = [], n[a]._data = {} }), a.forEach(function(a, t) { l.forEach(function(t) { var l = a[t]; n[t]._data[l] = (n[t]._data[l] || 0) + 1, n[t]._labels[l] = null }) }), l.forEach(function(a) { for (var t in n[a]._data) n[a]._labelsdata.push(n[a]._data[t]); n[a]._labels = Object.keys(n[a]._labels) }), t = n } return t }
