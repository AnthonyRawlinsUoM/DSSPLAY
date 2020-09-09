import { Component, OnInit, Input,AfterViewInit } from '@angular/core';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label, ThemeService } from 'ng2-charts';

import { DataFrame } from 'data-forge';
import * as pd from 'node-pandas';
import { DataFrameConsumer } from '../data-frame-consumer';
import { DfConsumerDirective } from '../df-consumer.directive';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit {
    @Input() dataframe: DataFrame;
    @Input() baseColor;
    @Input() ident;

    @Input() isDimmed;
    @Input() message = "Loading...";

    public isClickable = true;

    getDimness() {
        return this.isDimmed;
    }

    public chartData: ChartDataSets[] = [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    ];
    public chartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    public chartColors: Color[];
    public chartOptions: ChartOptions = {
        responsive: true,
      };
    public chartLegend = true;

        constructor() {}

        ngOnInit() {
            this.format(this.dataframe);
        }

        onDataframeChange(df:DataFrame) {
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

}
