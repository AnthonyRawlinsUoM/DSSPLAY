import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ChartDataSets, ChartOptions} from 'chart.js';
import { Color, Label, ThemeService } from 'ng2-charts';

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
export class BarchartComponent implements OnInit {

    @Input() baseColor;
    @Input() ident;

    @Input() dataframe: DataFrame;
    @Input() isDimmed;
    @Input() message = "Loading...";

    public isClickable = true;

    getDimness() {
        return this.isDimmed;
    }




    // chart: Chart;
    public chartData: ChartDataSets[] = [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    ];
    public chartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public chartColors: Color[] = [
      {
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
    ];
    public chartOptions:ChartOptions = {}   ;
    public chartLegend = true;
    public chartType = 'bar';
    public chartPlugins = [];

    constructor() {}

    ngOnInit() {
        this.format(this.dataframe);
    }

    public setDataframe(df:DataFrame) {
        this.format(df);
    }

    format(df:DataFrame) {

        console.log('Results DF changed!');
        this.chartData = [];

        let columns = df.getColumnNames();

        if(columns.includes('scenario_name')) {

            let good_columns = columns.filter(e => e !== 'scenario_name');


            this.chartLabels = good_columns;

            let wf_rows = df
                    .where(col => col['scenario_name']=='PB')
                    // .parseFloats(good_columns)
                    .toRows();

            if(wf_rows.length>0) {
                this.chartData
                .push({
                    label: 'Wildfire',
                    data: wf_rows
                });
            }

            let pb_rows = df
                    .where(col => col['scenario_name']=='PB')
                    // .parseFloats(good_columns)
                    .toRows();

            if(pb_rows.length>0) {
                this.chartData
                .push({
                    label: 'Prescribed Burn',
                    data: pb_rows
                });
            }

        } else {
            this.chartLabels = columns;
            this.chartData
            .push({
                label: 'Wildfire',
                data: df.toRows()
            });
        }
    }

    hueSkew(step) {
        // Generate secondary colors based on original
        // by slightly randomising HSV values
        // TODO
        return this.baseColor;
    }

}
// function fastpivot(a) { "use strict"; var t = {}; if ("string" != typeof a && a.length > 0) { var l = Object.keys(a[0]), n = {}; l.forEach(function(a) { n[a] = {}, n[a]._labels = [], n[a]._labelsdata = [], n[a]._data = {} }), a.forEach(function(a, t) { l.forEach(function(t) { var l = a[t]; n[t]._data[l] = (n[t]._data[l] || 0) + 1, n[t]._labels[l] = null }) }), l.forEach(function(a) { for (var t in n[a]._data) n[a]._labelsdata.push(n[a]._data[t]); n[a]._labels = Object.keys(n[a]._labels) }), t = n } return t }
