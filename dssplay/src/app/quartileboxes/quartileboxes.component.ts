import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

import * as Chart from 'chart.js';
import { ChartConfiguration, ChartData } from 'chart.js';
import "chartjs-chart-box-and-violin-plot/build/Chart.BoxPlot.js";
import { IBaseItem, IViolinItem, IKDESamplePoint, IBoxPlotItem } from "chartjs-chart-box-and-violin-plot/build/Chart.BoxPlot.js";
import { BurnTarget } from '../burn-target-options/burn-target-options.component';
import { Metric } from '../metrics/metrics.component';
import { DataFrame } from 'data-forge';
import { DfConsumerDirective } from '../df-consumer.directive';
// import { DataFrameConsumer } from '../data-frame-consumer';



// function randomValues(count, min, max) {
//   const delta = max - min;
//   return Array.from({ length: count }).map(() => Math.random() * delta + min);
// }

@Component({
    selector: 'app-quartileboxes',
    templateUrl: './quartileboxes.component.html',
    styleUrls: ['./quartileboxes.component.css']
})
export class QuartileboxesComponent extends DfConsumerDirective implements OnInit, AfterViewInit {
    @Input() dataframe: DataFrame;
    @Input() boxplotName;
    @Input() baseColor;

    boxchart: Chart;

    /*
    interface IBaseItem {
      min: number;
      median: number;
      max: number;
      // values of the raw items used for rendering jittered background points
      items?: number[];
    }

    interface IBoxPlotItem extends IBaseItem {
      q1: number;
      q3: number;
      whiskerMin?: number;
      whiskerMax?: number;
      // list of box plot outlier values
      outliers?: number[];
    }
    */

    results:Array<IBoxPlotItem> = [];

    initialData: ChartData = {
        // define label tree
        labels: ['1','2','3','4'],
        datasets: [{
            label: 'Series A',
            data: [[0],[0],[0],[0]]
        }]
    };

    constructor() {
        super();
    }

    ngOnInit() {

        this.boxchart = new Chart('quartiles', {

            type: 'boxplot',
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

                aspectRatio: 2.0,
                maintainAspectRatio: true,
                scales: {
                    xAxes: [{
                        gridLines: {
                            offsetGridLines: true
                        }
                    }]
                }
            }
        });

        // this.onDataframeChange(this.dataframe);
    }

    onDataframeChange(df: DataFrame) {
        console.log('DF changed!');
        console.log(df);
        this.boxchart.data.datasets = [];

        let columns = df.getColumnNames();

        if(columns.includes('scenario_name')) {

            let good_columns = columns.filter(e => e !== 'scenario_name');
            this.boxchart.data.labels = good_columns;


            let wf_rows = df
                    .where(col => col['scenario_name']=='PB')
                    .dropSeries('id')
                    .toRows();

            if(wf_rows.length>0) {
                this.boxchart.data.datasets
                .push({
                    label: 'Wildfire',
                    data: wf_rows
                });
            }

            let pb_rows = df
                    .where(col => col['scenario_name']=='PB')
                    .dropSeries('id')
                    .toRows();

            if(pb_rows.length>0) {
                this.boxchart.data.datasets
                .push({
                    label: 'Prescribed Burn',
                    data: pb_rows
                });
            }

        } else {
            this.boxchart.data.labels = columns;
            this.boxchart.data.datasets
            .push({
                label: 'Wildfire',
                data: df.dropSeries('id').toRows()
            });
        }

        this.refreshChart()
    }

    ngAfterViewInit() {
        console.log('#'+this.boxplotName);
    }

    refreshChart() {
        console.log('Refreshing charts');
        // if (this.results.length > 0) {
        //     console.log(this.results);
        // }
        this.boxchart.update();
    }



}
