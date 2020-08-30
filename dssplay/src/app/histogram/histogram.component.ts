import { Component, OnInit, Input } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BurnTarget } from '../burn-target-options/burn-target-options.component';
import { Metric } from '../metrics/metrics.component';
import { DataFrame } from 'data-forge';
import * as pd from 'node-pandas';
import { DfConsumerDirective } from '../df-consumer.directive';

@Component({
    selector: 'app-histogram',
    templateUrl: './histogram.component.html',
    styleUrls: ['./histogram.component.css']
})
export class HistogramComponent extends DfConsumerDirective implements OnInit {
    @Input() dataframe: DataFrame;
    @Input() baseColor;

    chart: Chart;
    chartOptions: ChartConfiguration;

    initialData: any = {
        // define label tree
        labels: ['WF', 'PB'],
        datasets: [
            {
                label: 'WF',
                barPercentage: 0.5,
                barThickness: 'flex',
                backgroundColor: this.hexToRgb(this.baseColor),
                borderColor: this.hueSkew(2),
                borderWidth: 1,
                minBarLength: 2,
                data: [38, 46, 23, 27, 14, 38]
            },
            {
                label: 'PB',
                barPercentage: 0.5,
                barThickness: 'flex',
                backgroundColor: this.hexToRgb(this.baseColor),
                borderColor: this.hueSkew(4),
                borderWidth: 1,
                minBarLength: 2,
                data: [34, 43, 20, 22, 12, 32]
            }
        ]
    };

    constructor() {
        super();
    }

    ngOnInit() {
        // console.log('Dataframe:', this.dataframe.toString());

        this.chart = new Chart('histogram', {
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

    componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    rgbToHex(r, g, b) {
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }

    hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
}
