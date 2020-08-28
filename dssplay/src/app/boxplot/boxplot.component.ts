import { Component, OnInit, Input } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BurnTarget } from '../burn-target-options/burn-target-options.component';
import { Metric } from '../metrics/metrics.component';
import DataFrame, { Row } from 'dataframe-js';


@Component({
    selector: 'app-boxplot',
    templateUrl: './boxplot.component.html',
    styleUrls: ['./boxplot.component.css']
})
export class BoxplotComponent implements OnInit {
    @Input() results:DataFrame;
    @Input() metrics;
    @Input() burnTargets;

    chart: Chart;
    charts: Array<Chart> = [];
    chartOptions: ChartConfiguration;


    // initialData: any = {
    //     // define label tree
    //     labels: [],
    //     datasets: []
    // };

    constructor() { }

    ngOnInit() {

        // Dataset PB 1 = prescribed_burn_target == 1
        // Dataset PB 2 = prescribed_burn_target == 2

        // house_loss
        // life_loss
        // fire_area

        console.log(this.results);


        // this.boxchart = new Chart('boxchart', {
        //
        //     type: 'boxplot',
        //     data: this.initialData,
        //     options: {
        //         legend: {
        //             display: true,
        //             position: 'top',
        //             align: 'start',
        //             labels: {
        //                 boxWidth: 8
        //             }
        //         },
        //         aspectRatio: 16 / 9,
        //         maintainAspectRatio: true,
        //         scales: {
        //             xAxes: [{
        //                 gridLines: {
        //                     offsetGridLines: true
        //                 }
        //             }],
        //             yAxes: [{
        //                 position: 'left',
        //                 ticks: {
        //                     beginAtZero: true,
        //                     suggestedMin: 0,
        //                     suggestedMax: 100,
        //                     stepSize: 10
        //                 }
        //             }]
        //         }
        //     }
        // });
        //
        // this.charts.push(this.boxchart);
        this.refreshCharts();
    }

    public colorOfMetric(metric: string) {
        return this.metrics
            .filter(m => m.label === metric)
            .map(m => {
                return m.color;
            });
    }

    public borderColorOfMetric(metric: string) {
        return this.metrics
            .filter(m => m.label === metric)
            .map(m => {
                return m.border;
            });
    }


    refreshCharts() {

        console.log('Refreshing charts');

        if(this.results.length > 0) {
            console.log(this.results);
        }

        // if ((this.metrics.length > 0 && this.burnTargets.length > 0)) {
        //
        //     console.log('Redrawing charts!');
        //     // Every chart...
        //     for (let c of this.charts) {
        //
        //         // nullify non-enabled datasets/metrics
        //         c.data.datasets
        //             .map(ds => {
        //                 if (ds.label == this.metrics[0].label || ds.label == this.metrics[1].label) {
        //                     ds.data = [];
        //                 }
        //             });
        //
        //         // Which do we have?
        //         let have = c.data.datasets
        //             .map(ds => {
        //                 return ds.label;
        //             });
        //
        //         // Which do we not have?
        //         let missing = [];
        //         let active = [];
        //
        //         this.metrics.map(m => {
        //             if (have.indexOf(m.label) == -1) {
        //                 missing.push(m.label);
        //             } else {
        //                 active.push(m);
        //             }
        //         });
        //
        //
        //
        //         if (missing.length > 0) {
        //
        //             let col = 0;
        //
        //             // Add dataset from template
        //             missing.map(miss => {
        //                 let data = [];
        //                 // this.burnTargets.map(bt => {
        //                 //   // TODO - Replace with Service call to socket.io server/Postgres
        //                 //   for(let mt of this.metrics) {
        //                 //     data.push(randomValues(10, 25, 75));
        //                 //   }
        //                 // });
        //
        //                 c.data.datasets.push({
        //                     label: miss,
        //                     backgroundColor: this.colorOfMetric(miss)[0], // TODO - auto colorize
        //                     borderColor: this.borderColorOfMetric(miss)[0],
        //                     borderWidth: 1,
        //                     // itemRadius: 0.2,
        //                     data: data
        //                 });
        //
        //                 col++;
        //             });
        //
        //         }
        //
        //         let removals = [];
        //
        //         for (let ds of c.data.datasets) {
        //             let good = false;
        //             for (let m of this.metrics) {
        //                 if (ds.label === m.label) {
        //                     good = true;
        //                 }
        //             }
        //             if (!good) {
        //                 removals.push(ds);
        //             }
        //         }
        //         c.data.datasets = c.data.datasets.filter((r) => !removals.includes(r));
        //
        //
        //         // All present now
        //         // c.data.datasets
        //         // .map(ds => {
        //         //   let data = [];
        //         //   this.burnTargets.map(bt => {
        //         //     // Replace with Service call to socket.io server/Postgres
        //         //
        //         //     for(let mt of this.metrics) {
        //         //       // console.log(ds.label);
        //         //       if(mt.label === ds.label) {
        //         //         // console.log('Adding data');
        //         //         data.push(randomValues(10, 25, 75));
        //         //
        //         //       }
        //         //     }
        //         //   });
        //         //
        //         //   ds.data = data;
        //         // });
        //
        //
        //         // Update labels
        //         c.data.labels = this.results.columns;
        //             // .map(bt => {
        //             //     return bt.label;
        //             // });
        //
        //         // console.log(c.data.labels);
        //
        //         c.update();
        //     }
        // }
        this.charts.map(c => c.update());
    }

}
