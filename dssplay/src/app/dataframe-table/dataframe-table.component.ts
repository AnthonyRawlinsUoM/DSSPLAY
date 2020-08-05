import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DataService } from '../data.service';

export const enum DIRECTION {
    ASC = 'ASC',
    DESC = 'DESC'
}

export interface LimitOptions {
    limited:number;
    offset_amount: number;
}

@Component({
  selector: 'app-dataframe-table',
  templateUrl: './dataframe-table.component.html',
  styleUrls: ['./dataframe-table.component.css']
})
export class DataframeTableComponent implements OnInit {

    @Input() results;

    @Output() limitChange = new EventEmitter<LimitOptions>();
    @Output() orderChange = new EventEmitter<Map<string, DIRECTION>>();

    limit: LimitOptions;
    order: Map<string, DIRECTION>;
    selectedPage;

  constructor(private dat: DataService) { }

  ngOnInit() {
      this.order = new Map<string, DIRECTION>();
      this.order.set('id', DIRECTION.DESC);
  }

  sortby(column:string, direction) {
      if (direction == 'None') {
          this.order.delete(column);
      } else {
          this.order.set(column, direction);
      }
      // this.dat.logEntry('Setting sort ordering to: ' + this.order);
      console.log('Setting sort ordering to: ');
      for(let i of this.order.keys()) {
          console.log(i, this.order.get(i));
      }
      this.orderChange.emit(this.order);
  }
}
