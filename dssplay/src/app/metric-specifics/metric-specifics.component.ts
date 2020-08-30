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
    ViewChild
} from '@angular/core';
import { DataService } from '../data.service';
import { DataFrame } from 'data-forge';
import { DataFrameConsumer } from '../data-frame-consumer';
import { DataframeTableComponent } from '../dataframe-table/dataframe-table.component';
import { BoxplotComponent } from '../boxplot/boxplot.component';
import { LinechartComponent } from '../linechart/linechart.component';
import { DfConsumerDirective } from '../df-consumer.directive';
// import { uuid } from 'uuidv4';


// @Directive({ selector: 'df-consumer' })
// class DFConsumer implements DataFrameConsumer {
//     invalidate(message:string):void {};
//     validate(message:string):void {};
// }

@Component({
    selector: 'app-metric-specifics',
    templateUrl: './metric-specifics.component.html',
    styleUrls: ['./metric-specifics.component.css']
})
export class MetricSpecificsComponent implements OnInit {
    @Input() metricLabel;
    @Input() moduleViews;
    @Input() icon;
    @Input() color;
    @Input() cssClassName;
    @Input() id;
    @Input() sql;
    @Input() stats;
    @Input() which;
    @Input() measures;

    @ViewChildren(DfConsumerDirective) viewChildren!: QueryList<DfConsumerDirective>;

    // @Output() dfInvalidate:EventEmitter<String> = new EventEmitter<String>();
    // @Output() dfValidate:EventEmitter<String> = new EventEmitter<String>();



    dataframe: DataFrame;

    uuid: string;
    errors;

    constructor(private data: DataService) { }

    ngOnInit() {

        if (this.sql) {

            this.viewChildren.map(vc => vc.invalidate('Loading...'));

            this.data.sendSQL({ sender: 'metric-specific', sql: this.sql }).subscribe(data => {
                if (data.sender == 'metric-specific') {
                    this.dataframe = new DataFrame(data.result); // Pull out of Envelope
                    console.log(this.dataframe.toString());
                    this.viewChildren.map(vc => vc.validate('Loading complete.'));
                }
            }, err => {
                console.error(err);
                this.errors = err;
            });
        } else {
            console.log('Got no sql. Using dummy data.');
            this.dataframe = new DataFrame(
                {
                    index: [1],
                    values: [
                        {
                            Avg: 10,
                            Median: 20,
                            CoV: 30,
                            Maximum: 40,
                            Total: 50
                        }
                    ]
                }
            );
        }
    }

    // fetch(vname, sql) {
    //     this.invalidate('Loading...');
    //     this.data.sendSQL({ sql: sql, sender: vname }).subscribe(data => {
    //         if (data.sender == vname) {
    //             this.dataframe = new DataFrame(data.result); // Pull out of Envelope
    //             console.log(this.dataframe.toString());
    //             this.dataframeChange.emit(this.dataframe);
    //             this.validate('Loading complete.');
    //             this.chart.refreshChart();
    //         }
    //     }, err => {
    //         console.error(err);
    //         this.errors = err;
    //     });
    // }

    invalidate(message) { }
    validate(message) { }

    onRepsRangeChange(event) {
        console.log(event);
    }

    valueFor(stat, metric) {
        return 100; // TODO
    }
}
