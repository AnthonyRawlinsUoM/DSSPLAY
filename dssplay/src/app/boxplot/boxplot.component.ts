import { Component, OnInit, AfterViewInit, Input, ViewChild } from '@angular/core';

import { Chart, ChartData, ChartOptions } from 'chart.js';
import 'chartjs-chart-box-and-violin-plot';
import * as Color from 'color';


import { BurnTarget } from '../burn-target-options/burn-target-options.component';
import { Metric } from '../metrics/metrics.component';
import { DataFrame } from 'data-forge';

// import { DataFrame as DF } from 'node-pandas';
// import * as pd from 'node-pandas';


// function randomValues(count, min, max) {
//   const delta = max - min;
//   return Array.from({ length: count }).map(() => Math.random() * delta + min);
// }

@Component({
    selector: 'app-boxplot',
    templateUrl: './boxplot.component.html',
    styleUrls: ['./boxplot.component.css']
})
export class BoxplotComponent implements OnInit {
    @Input() dataframe: DataFrame;
    @Input() boxplotName;
    @Input() baseColor;
    @Input() borderColor;

    @ViewChild('boxplot', {static: false}) boxplot: Chart;

    @Input() isDimmed;
    @Input() message = "Loading...";

    public isClickable = true;


    initialData: ChartData;
    data: ChartData;
    options: ChartOptions = {
        responsive: true,
        legend: {
            display: false,
            position: 'bottom',
            align: 'center',
            labels: {
                boxWidth: 8
            }
        },

        aspectRatio: 2.0,
        maintainAspectRatio: true,
        scales: {
            xAxes: [{
                gridLines: {
                    offsetGridLines: true
                }
            }]
        }
    };

    getDimness() {
        return this.isDimmed;
    }

    constructor() {}

    ngOnInit() {

        console.log(this.dataframe);
        this.data = this.format(this.dataframe);
    }

    onDataframeChange(df: DataFrame) {
        console.log('BOXPLOT GOT NEW DATA!');
        this.data = this.format(df);
    }

    public setDataframe(df:DataFrame) {
        console.log('BOXPLOT GOT NEW DATA!');
        this.data = this.format(df);
    }

    format(df:DataFrame):ChartData {

        let dataStruct = {
            labels: [],
            datasets: []
        };


        // let frame = new pd.DataFrame( df.toArray());



        console.log('DF changed!');
        // console.log(frame);
        // this.boxplot.data.datasets.pop();

        let columns = df.getColumnNames();
        console.log(columns);

        if(columns.includes('scenario_name')) {

            let good_columns = columns.filter(e => e !== 'scenario_name');
            dataStruct.labels = good_columns;


            let wf_rows = df
                    .where(col => col['scenario_name']=='WF')
                    .getSeries('avg') // FIXME!
                    .toArray();

            console.log(wf_rows);


            if(wf_rows.length>0) {
                console.log(wf_rows);

                dataStruct.datasets
                .push({
                    label: 'Wildfire',
                    backgroundColor: this.baseColor,
                    borderColor: this.borderColor,
                    borderWidth: 1,
                    data: wf_rows
                });
            }

            let pb_rows = df
                    .where(col => col['scenario_name']=='PB')
                    .getSeries('avg')
                    .toArray();

            console.log(pb_rows);

            if(pb_rows.length>0) {
                dataStruct.datasets
                .push({
                    label: 'Prescribed Burn',
                    backgroundColor: this.tints(this.baseColor, 'rgb'),
                    borderColor: this.tints(this.borderColor, 'hex'),
                    borderWidth: 1,
                    data: pb_rows
                });
            }

        } else if (columns.includes('_median')) {

            console.log('GOING TO USE NEW DF!');
            //
            // let dv = [];
            // df.getSeries('id')
            // .toArray()
            // .forEach(row => { dv.push({
            //         min: df.getSeries('_min').at(row),
            //         median: df.getSeries('_median').at(row),
            //         max: df.getSeries('_max').at(row)
            //     });
            // });
            //
            // // This is a summary table!
            // dataStruct.datasets = [{
            //     label: "Dataset",
            //     backgroundColor: this.baseColor,
            //     borderColor: this.borderColor,
            //     borderWidth: 1,
            //     data: dv
            // }];

        } else {
            console.log('Whats going on?');
            console.log(df);

            dataStruct.labels = df.getSeries('id').toArray();
            dataStruct.datasets
            .push({
                label: ' ',
                backgroundColor: "rgba(255,0,0,0.5)",
                borderColor: this.baseColor,
                borderWidth: 1,
                data: df.toRows()
            });
        }

        return dataStruct;
    }

    tints(base: string, mode: string ) {
        // Generate secondary colors based on original
        // by slightly randomising HSV values
        // https://www.npmjs.com/package/color

        let c:Color.color = Color.color(base).rotate(-9);

        if (mode == 'rgb') {
            return c.rgb().string();
        } else if (mode == 'hex') {
            return c.hex();
        } else {
            return c.hex();
        }

    }

}
