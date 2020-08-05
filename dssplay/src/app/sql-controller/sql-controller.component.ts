import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';

import { LimitOptions, DIRECTION } from '../dataframe-table/dataframe-table.component';
import { of } from 'rxjs';

@Component({
    selector: 'app-sql-controller',
    templateUrl: './sql-controller.component.html',
    styleUrls: ['./sql-controller.component.css']
})
export class SqlControllerComponent implements OnInit {

    show_sidebar = false;
    query;

    metrics_tables;
    burnTargets;

    limits;
    ordering = '';

    errors;

    results = [
        {rows: [
            {id:1, regime_id:2, scenario_id:3},
            {id:4, regime_id:5, scenario_id: 6}
        ], columns: ['id', 'regime_id', 'scenario_id']}
    ];

    constructor(private dat: DataService) { }

    ngOnInit() {
        this.dat.logEntry('Initiating SQLQueryController()');
    }

    onMetricsChange(m) {
        console.log('Got metrics change event.');
        this.metrics_tables = m.map(m => m.option).join(', ')

    }

    onBurnTargetsChange(bt) {
        console.log('Got burn targets change');
        console.log(bt);
        this.burnTargets = bt.map(b => bt.option);

        if(this.burnTargets.length > 0) {

            this.query = `
              SELECT *
              FROM ${this.metrics_tables}
              ${this.ordering};`;
        }
    }

    buildQuery() {
        this.query = `
          SELECT DISTINCT *
          FROM ${this.metrics_tables}
          ${this.ordering};`;

          this.fetch('dynamic', this.query);
    }

    setLimits(limited: number, offset_amount: number) {
        const limit = 'LIMIT ';
        const offset = ' OFFSET ';
        return limit + limited + offset + offset_amount;
    }

    setOrdering(order: Map<string, DIRECTION>) {
        const cmd = 'ORDER BY ';
        if(order.size > 0) {
            this.ordering = cmd;
            console.log();
            let o_elems = [];

            order.forEach((v, k) => {
                o_elems.push(`${k} ${v}`);
            });
            this.ordering += o_elems.join(', ');

        } else {
            this.ordering = '';
        }
    }

    onLimitChange(ev:LimitOptions) {
        this.setLimits(ev.limited, ev.offset_amount);
    }

    onOrderChange(ev:Map<string, DIRECTION>) {
        this.setOrdering(ev);
    }

    sqlize(metrics) {
        console.log(metrics);

        return metrics.map(m => {
            let inc = 'A';
            return `${m.label} AS ${inc},`;
        });
    }
    fetch(vname, sql) {
        this.dat.sendSQL({sql: sql, sender: vname}).subscribe(data => {
            if (data.sender == vname) {
                console.log(data.result);

                let rows = [];
                let columns = [];

                for (let row of data.result) {
                    console.log(row);
                    for (let k of Object.entries(row)) {
                        if (columns.indexOf(k[0]) == -1) {
                            columns.push(k[0]);
                        }
                    }
                    let r = [];
                    for (let col of columns) {
                        r.push(row[col]);
                    }
                    rows.push(r);
                }
                this.results.filter(r => r.name == vname).map(r => {
                    r.rows = rows;
                    r.columns = columns;
                });
            }
        }, err => {
            console.error(err);
            this.errors = err;
        });
    }

  }

  function fastpivot(a){"use strict";var t={};if("string"!=typeof a&&a.length>0){var l=Object.keys(a[0]),n={};l.forEach(function(a){n[a]={},n[a]._labels=[],n[a]._labelsdata=[],n[a]._data={}}),a.forEach(function(a,t){l.forEach(function(t){var l=a[t];n[t]._data[l]=(n[t]._data[l]||0)+1,n[t]._labels[l]=null})}),l.forEach(function(a){for(var t in n[a]._data)n[a]._labelsdata.push(n[a]._data[t]);n[a]._labels=Object.keys(n[a]._labels)}),t=n}return t}
