import {
    Component,
    Directive,
    OnInit,
    Input,
    Output,
    AfterViewInit,
    QueryList,
    ViewChildren,
    EventEmitter,
    ViewChild,
    OnDestroy
} from '@angular/core';
import { DataService } from '../data.service';
import { DataFrame } from 'data-forge';

import { BoxplotComponent } from '../boxplot/boxplot.component';
import { LinechartComponent } from '../linechart/linechart.component';
import { HistogramComponent } from '../histogram/histogram.component';

import { DataframeTableComponent } from '../dataframe-table/dataframe-table.component';

import {
  mean, median, std, min, max, pow, round, sqrt
} from 'mathjs'

// import { uuid } from 'uuidv4';


// @Directive({ selector: 'df-consumer' })
// class DFConsumer implements DataFrameConsumer {
//     invalidate(message:string):void {};
//     validate(message:string):void {};
// }

const defaults = [{
    id: 1,
    _median: 0,
    _min: 0,
    _max: 0,
    _stddev: 0,
    _total: 0,
    _cov: 0,
    _avg: 0
}];

const lazyInit = () => ({
    index: [1, 2],
    values: [
        {scenario_name: 'PB', ha: 91982},
        {scenario_name: 'WF', ha: 10812}
    ]
});

@Component({
    selector: 'app-metric-specifics',
    templateUrl: './metric-specifics.component.html',
    styleUrls: ['./metric-specifics.component.css']
})
export class MetricSpecificsComponent implements OnInit, AfterViewInit, OnDestroy {
    @Output() dataframeChange: EventEmitter<DataFrame> = new EventEmitter<DataFrame>();
    @Output() summaryframeChange: EventEmitter<DataFrame> = new EventEmitter<DataFrame>();

    @Input() metricLabel;
    @Input() moduleViews;
    @Input() icon;
    @Input() color;
    @Input() borderColor;
    @Input() cssClassName;
    @Input() id;
    @Input() rawdatasql;
    @Input() summarysql;
    @Input() stats;
    @Input() which;
    @Input() measures;

    @ViewChild('boxplot', { static: false }) boxplot: BoxplotComponent;
    @ViewChild('histogram', { static: false }) histogram: HistogramComponent;
    @ViewChild('dftable', {static: false}) dftable: DataframeTableComponent;
    @ViewChild('dfsummarytable', {static: false}) dfsummarytable: DataframeTableComponent;

    // @Output() dfInvalidate:EventEmitter<String> = new EventEmitter<String>();
    // @Output() dfValidate:EventEmitter<String> = new EventEmitter<String>();

    uuid: string;
    errors;
    summary;
    summary_sub;
    dataframe_sub;

    summaryDimmed = true;
    summarymessage = "Loading...";

    dfDimmed = true;
    dfmessage = "Loading...";

    summarytable;
    dataframetable;

    dataframe: DataFrame;

    constructor(private data: DataService) {}

    ngOnInit() {
        let summary = {
            id: 1,
            _median: 0,
            _min: 0,
            _max: 0,
            _stddev: 0,
            _total: 0,
            _cov: 0,
            _avg: 0
        };



        this.summarytable = new DataFrame(lazyInit);
        this.dataframe = new DataFrame(lazyInit);

        if (this.summarysql !== '') {
            this.summaryDimmed = true;
            this.summarymessage = "Loading...";

            this.summary_sub = this.data.getSummarySQL({ sender: this.id, sql: this.summarysql }).subscribe(data => {
                if (data.sender == this.id) {
                    let summarytable = new DataFrame(data.result);

                    let columns = summarytable.getColumnNames();

                    console.log(columns);

                    if(columns.includes('scenario_name')) {

                        let ds = [];
                        let summary1 = this.summary;
                        let summary2 = this.summary;

                        console.log(summarytable.toString());
                        let wf_df = summarytable.where(col => col['scenario_name']=='WF');
                        let pb_df = summarytable.where(col => col['scenario_name']=='PB');

                        for(let s of this.stats) {
                            for(let c of columns) {
                                if(c == statmap[s]) {
                                    summary1[c] = mean(wf_df.getSeries(c).toArray());
                                }
                            }
                        }

                        ds.push([{values: summary1}]);

                        for(let s of this.stats) {
                            for(let c of columns) {
                                if(c == statmap[s]) {
                                    summary2[c] = mean(pb_df.getSeries(c).toArray());
                                }
                            }
                        }

                        ds.push([{values: summary2}]);

                        this.summarytable = new DataFrame([summary1, summary2]);

                        console.log(this.summarytable);

                    } else {

                        // console.log(summarytable.toString());
                        let summary_mono = {};

                        for(let s of this.stats) {
                            for(let c of columns) {
                                if(c == statmap[s]) {
                                    summary_mono[c] = mean(summarytable.getSeries(c).toArray());
                                }

                            }
                        }

                        this.summarytable = new DataFrame([summary_mono]);
                    }

                    this.summaryframeChange.emit(this.summarytable);

                    // Undim the stats
                    this.summaryDimmed = false;

                    // Explicit viewchild update forced
                    this.dfsummarytable.dataframe = this.summarytable;

                    this.summarymessage = 'Loading complete.';

                    this.data.logEntry('Loading of summary table complete: Notifying Observers.');

                }
            }, err => {
                console.error(err);
                this.errors = err;
                this.data.logEntry(err);
            });
        }

        if (this.rawdatasql !== '') {

            this.dfmessage = 'Loading...';
            this.dfDimmed = true;

            this.dataframe_sub = this.data.sendSQL({ sender: this.id, sql: this.rawdatasql }).subscribe(data => {
                if (data.sender == this.id) {
                    this.dataframe = new DataFrame(data.result);
                    this.dataframeChange.emit(this.dataframe);

                     // Pull out of Envelope
                    this.data.logEntry('Loading of dataframe complete: Notifying Observers.');
                    this.dfmessage = 'Loading complete.';
                    this.dfDimmed = false;

                    console.log(this.dataframe);

                    this.boxplot.setDataframe(this.dataframe);

                }
            }, err => {
                console.error(err);
                this.errors = err;
            });
        }
         else {
            console.log('Got no sql. Using dummy data!');

            this.dataframeChange.emit(this.dataframe);
        }
    }

    ngOnDestroy() {
        if(this.summary_sub) {
            this.summary_sub.unsubscribe();
        }
        if(this.dataframe_sub) {
            this.dataframe_sub.unsubscribe();
        }

    }

    ngAfterViewInit() {}

    onRepsRangeChange(event) {
        console.log(event);
    }

    valueFor(stat, metric) {
        // console.log(this.summarytable);
        return this.summarytable.at(0)[statmap[stat]];
    }

    as_csv(path) {
        const csvData = this.dataframe.toCSV({ header: false });

    }
}
const statmap = {
    'Avg':'_avg',
    'Median':'_median',
    'Deviation':'_stddev',
    'Total':'_total',
    'Min':'_min',
    'Max':'_max',
    'CoV':'_cov',
    'Mean':'_avg'
}
