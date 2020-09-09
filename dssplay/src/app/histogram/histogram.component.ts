import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { Chart, ChartData, ChartOptions } from 'chart.js';
import * as Color from 'color';

import { BurnTarget } from '../burn-target-options/burn-target-options.component';
import { Metric } from '../metrics/metrics.component';
import { DataFrame } from 'data-forge';
// import * as pd from 'node-pandas';
import { DfConsumerDirective } from '../df-consumer.directive';

@Component({
    selector: 'app-histogram',
    templateUrl: './histogram.component.html',
    styleUrls: ['./histogram.component.css']
})
export class HistogramComponent implements OnInit, OnChanges {
    @Input() dataframe: DataFrame;
    @Input() baseColor;
    @Input() borderColor;
    @Input() ident;
    @Input() isDimmed;
    @Input() message = "Loading...";

    public isClickable = true;

    getDimness() {
        return this.isDimmed;
    }


    // chart: Chart;
    public chartData: ChartData = {
        labels: [],
        datasets: [
            { data: [635, 59, 180, 281, 256, 355, 401], label: 'Burnt Area (ha)' },
        ]
    };


    public chartOptions: ChartOptions = {};
    public chartLegend = true;
    public bar = 'bar';
    public chartPlugins = [];

    ngOnChanges(){
        this.chartData = this.format(this.dataframe);

        let a = this.tints(this.baseColor, 'rgb');
        let b = this.tints(a, 'hex');
        let c = this.tints(b, 'rgb');
        console.log(a,b,c);
    }

    constructor() {}
    ngOnInit() {

    }

    onDataframeChange(df: DataFrame) {
        this.chartData = this.format(df);
    }

    format(df: DataFrame): ChartData {

        console.log('Results DF changed!');

        let dataStruct = {
            labels: [],
            datasets: []
        };

        let columns = df.getColumnNames().filter(e => e !== 'id');

        // dataStruct.labels = df.getIndex().toArray();



        if (columns.includes('scenario_name')) {

            dataStruct.labels = ['by Fire Type'];

            let good_columns = columns.filter(e => e !== 'scenario_name');

            // Just using the first good column for testing

            let wf_rows = df
                .where(col => col['scenario_name'] == 'WF')
                .getSeries(good_columns[0])
                .toArray();

            if (wf_rows.length > 0) {
                dataStruct.datasets
                    .push({
                        label: 'Wildfire',
                        backgroundColor: this.tints(this.baseColor, 'rgb'),
                        borderColor: this.tints(this.borderColor, 'hex'),
                        borderWidth: 1,
                        data: wf_rows
                    });
            }

            let pb_rows = df
                .where(col => col['scenario_name'] == 'PB')
                .getSeries(good_columns[0])
                .toArray();

            if (pb_rows.length > 0) {
                dataStruct.datasets
                    .push({
                        label: 'Prescribed Burn',
                        backgroundColor: this.tints(this.baseColor, 'rgb'),
                        borderColor: this.tints(this.borderColor, 'hex'),
                        borderWidth: 1,
                        data: pb_rows
                    });
            }

        } else {

            dataStruct.labels = [' '];

            dataStruct.datasets
                .push({
                    label: 'AVG',
                    backgroundColor: this.baseColor,
                    borderColor: this.borderColor,
                    borderWidth: 1,
                    data: df.getSeries(columns[0]).toArray()
                });
        }

        return dataStruct;
    }

    tints(base: string, mode: string ) {
        // Generate secondary colors based on original
        // by slightly randomising HSV values
        // https://www.npmjs.com/package/color

        let c = Color.color(base).rotate(-9);

        console.log(c.hex());

        if (mode == 'rgb') {
            return c.rgb().string();
        } else if (mode == 'hex') {
            return c.hex();
        } else {
            return c.hex();
        }
    }


}
