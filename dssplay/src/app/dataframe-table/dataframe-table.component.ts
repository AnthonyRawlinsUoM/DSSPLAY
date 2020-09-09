import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DataService } from '../data.service';
import { DataFrame } from 'data-forge';
import { DfSummaryConsumerDirective } from '../df-summary-consumer.directive';

export const enum DIRECTION {
    ASC = 'ASC',
    DESC = 'DESC'
}

export interface LimitOptions {
    limited: number;
    offset_amount: number;
}

@Component({
    selector: 'app-dataframe-table',
    templateUrl: './dataframe-table.component.html',
    styleUrls: ['./dataframe-table.component.css']
})
export class DataframeTableComponent implements OnInit {

    @Input() dataframe: DataFrame;

    @Output() limitChange = new EventEmitter<LimitOptions>();
    @Output() orderChange = new EventEmitter<Map<string, DIRECTION>>();
    @Input() isDimmed;
    @Input() message = "Loading...";

    public isClickable = true;

    

    getDimness() {
        return this.isDimmed;
    }

    limit: LimitOptions;
    order: Map<string, DIRECTION>;
    pageSize = 10;
    selectedPage = 1;
    maxSize=5;

    constructor(private dat: DataService) {}

    ngOnInit() {
        this.order = new Map<string, DIRECTION>();
        this.dataframe = new DataFrame(
            [ { A: 10 }, { A: 20 }, { A: 30 }, { A: 40 }]
        );
    }

    sortby(column: string, direction) {
        if (direction == 'None') {
            this.order.delete(column);
        } else {
            this.order.set(column, direction);
        }
        // this.dat.logEntry('Setting sort ordering to: ' + this.order);
        console.log('Setting sort ordering to: ');
        for (let i of this.order.keys()) {
            console.log(i, this.order.get(i));
        }
        this.orderChange.emit(this.order);
    }

    onDataframeChange(df: DataFrame) {
        console.log('DataframeTbale noticed DF has changed!');
        this.dataframe = df;
        console.log(df);
    }

    onLimitChange(event) {
        console.log(event);
        this.limitChange.emit({ limited: 10, offset_amount: (this.selectedPage - 1) * this.pageSize });
    }

    getColumns() {
        if(!(this.dataframe instanceof DataFrame)) {
            console.error('What the f?');
            return [];
        } else {
            return this.dataframe.getColumnNames();
        }

    }

}
