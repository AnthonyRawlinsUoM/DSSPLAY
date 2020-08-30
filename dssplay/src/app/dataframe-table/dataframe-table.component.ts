import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DataService } from '../data.service';
import { DataFrame } from 'data-forge';
import { DfConsumerDirective } from '../df-consumer.directive';

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
export class DataframeTableComponent extends DfConsumerDirective implements OnInit {

    @Input() dataframe: DataFrame;

    @Output() limitChange = new EventEmitter<LimitOptions>();
    @Output() orderChange = new EventEmitter<Map<string, DIRECTION>>();

    limit: LimitOptions;
    order: Map<string, DIRECTION>;
    pageSize = 20;
    selectedPage = 1;

    message = 'Loading...';
    tableIsDimmed = false;
    isClickable = false;

    constructor(private dat: DataService) {
        super();
    }

    ngOnInit() {
        this.order = new Map<string, DIRECTION>();
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

    onLimitChange(event) {
        console.log(event);
        this.limitChange.emit({ limited: 1000, offset_amount: (this.selectedPage - 1) * this.pageSize });
    }

}
