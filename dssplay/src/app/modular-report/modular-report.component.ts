import { Component, OnInit, Input,EventEmitter,Output } from '@angular/core';
import { DataService } from '../data.service';
import { FuelType } from '../fuel-panels/fuel-panels.component';
import { BurnTarget } from '../burn-target-options/burn-target-options.component';
import { Metric } from '../metrics/metrics.component';
import { LimitOptions, DIRECTION } from '../dataframe-table/dataframe-table.component';
import { of } from 'rxjs';
import { easing } from 'ts-easing';

import DataFrame, { Row } from 'dataframe-js';

/*
const df = new DataFrame(data, columns);

// From a collection (easier)
const df = new DataFrame([
    {c1: 1, c2: 6}, // <------- A row
    {c4: 1, c3: 2}
], ['c1', 'c2', 'c3', 'c4']);

// From a table
const df = new DataFrame([
    [1, 6, 9, 10, 12], // <------- A row
    [1, 2],
    [6, 6, 9, 8, 9, 12],
], ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']);

// From a dictionnary (Hash)
const df = new DataFrame({
    column1: [3, 6, 8], // <------ A column
    column2: [3, 4, 5, 6],
}, ['column1', 'column2']);

// From files
DataFrame.fromText('/my/absolue/path/myfile.txt').then(df => df);
DataFrame.fromDSV('/my/absolue/path/myfile.txt').then(df => df);
DataFrame.fromPSV('http://myurl/myfile.psv').then(df => df);
DataFrame.fromTSV('http://myurl/myfile.tsv').then(df => df);
DataFrame.fromCSV('http://myurl/myfile.csv').then(df => df);
DataFrame.fromJSON('http://myurl/myfile.json').then(df => df);
DataFrame.fromJSON(new File(...)).then(df => df);
*/


@Component({
    selector: 'app-modular-report',
    templateUrl: './modular-report.component.html',
    styleUrls: ['./modular-report.component.css']
})
export class ModularReportComponent implements OnInit {

    @Output() dataframe: EventEmitter<DataFrame> = new EventEmitter<DataFrame>();

    show_sidebar = false;
    query;
    tableIsDimmed = false;
    metrics;
    metrics_tables;

    burnTargets: Array<BurnTarget> = [];
    burn_targets: Array<number>;

    default_ordering: Map<string, DIRECTION>;
    limits;
    ordering = '';
    fuels_query = "AND (ft.fuel_machine_type_name = 'invexp')";

    burns_query = '';
    harvesting_on = false;
    harvesting_off = false;

    errors;
    results = [
        {
            rows: [
                [1, 14849411, 'WF'],
                [1, 9156334, 'PB'],
                [3, 20532538, 'WF'],
                [3, 27744620, 'PB']
            ], columns: ['planburn_target_perc', 'ha', 'Season']
        }
    ];

    constructor(private dat: DataService) { }

    ngOnInit() {
        this.default_ordering = new Map<string,DIRECTION>();
        this.default_ordering.set('job.planburn_target_perc', DIRECTION.ASC);
        this.default_ordering.set('Season', DIRECTION.ASC);
        this.setOrdering(this.default_ordering);
        this.limits = this.setLimits(100, 0); // Set tiny for testing
        // this.dataframe = new DataFrame(this.results[0].rows, this.results[0].columns)
    }

    onMetricsChange(m) {
        console.log('Got metrics change event.');
        this.metrics_tables = m.map(m => m.option);
        this.buildQuery();
    }

    onBurnTargetsChange(bt) {
        console.log('Got burn targets change');
        console.log(bt);
        this.burnTargets = bt;

        this.burn_targets = [];
        bt.map((b) => {
            console.log(b);
            this.burn_targets.push(b['value']);
        });
        console.log('burn_targets after mapping: ', this.burn_targets);

        this.burns_query = `AND (
            `;

        if (this.burn_targets.length > 0) {
            let o_elems = [];

            this.burn_targets.map((b) => o_elems.push(`job.planburn_target_perc = ${b}`));
            this.burns_query += o_elems.join(`
            OR `);
            this.burns_query += `
            )`;

        } else {
            this.burns_query = '';
        }
        this.buildQuery();
    }

    buildQuery() {
        if (this.metrics_tables.length > 0) {

            // TODO harvesting on/off
            let people = '';
            let houses = '';
            let phi_table = '';
            let fire_q = '';
            let impacts_table = '';
            let harvesting_on = `AND job.harvesting_on = ${this.harvesting_on}`;

            for (let m of this.metrics_tables) {
                if (m == 'life_loss') {
                    people += `avg(p.people_lost_harris_method) as people_lost_harris_method_mean,`;
                    phi_table = `INNER JOIN peoplehouseloss p
                        ON s.uuid = p.uuid
                        AND s.regime = p.regime
                        AND s.replicate = p.replicate
                        `;
                }
                if (m == 'people_exposed') {
                    people += `avg(p.people_exposed) as people_exposed_mean,`;
                    phi_table = `INNER JOIN peoplehouseloss p
                        ON s.uuid = p.uuid
                        AND s.regime = p.regime
                        AND s.replicate = p.replicate
                        `;
                }
                if (m == 'house_loss') {
                    houses += `avg(p.houses_lost) as houses_lost_mean,`;
                    phi_table = `INNER JOIN peoplehouseloss p
                        ON s.uuid = p.uuid
                        AND s.regime = p.regime
                        AND s.replicate = p.replicate
                        `;
                }
                if (m == 'houses_exposed') {
                    houses += `avg(p.houses_exposed) as houses_exposed_mean,`;
                    phi_table = `INNER JOIN peoplehouseloss p
                        ON s.uuid = p.uuid
                        AND s.regime = p.regime
                        AND s.replicate = p.replicate
                        `;
                }
                if (m == 'fire_size') {

                    fire_q = `SUM(t.burnt_area) as ha,`;


                }
                console.log(m);
            }

            impacts_table = `
                INNER JOIN totalfireimpact t
                    ON s.uuid = t.uuid
                    AND s.regime = t.regime
                    AND s.replicate = t.replicate
                `;

            this.query = `
            SELECT
                job.planburn_target_perc,
                ${people}
                ${houses}
                ${fire_q}
                st.scenario_name AS Season
            FROM
                job
                INNER JOIN fuel_machine_type ft
                    ON ft.fuel_machine_type_id = job.fuel_machine_kind
                INNER JOIN jobtojobstate js
                    ON job.id=js.job_id


                INNER JOIN jobstate j
                    ON js.job_state_id = j.id,
                scenario s
                ${impacts_table}
                ${phi_table}
                , scenario_types st

            WHERE j.published = true
                ${this.burns_query}
                AND t.uuid = job.uuid
                AND job.num_replicates <= 100
                ${harvesting_on}
                ${this.fuels_query}
                AND s.id = t.scenario_id
                AND st.scenario_type = s.type

                GROUP BY job.planburn_target_perc, s.type, Season

                ${this.ordering}
                ${this.limits};
                `;
            this.fetch('dynamic', this.query);
        } else {
            // Not yet implemented!
            console.log('Not yet implemented!')
            console.log(this.metrics_tables);
        }
    }

    setLimits(limited: number, offset_amount: number) {
        const limit = 'LIMIT ';
        const offset = ' OFFSET ';
        //
        return limit + limited + offset + offset_amount;
    }

    setOrdering(order: Map<string, DIRECTION>) {
        const cmd = 'ORDER BY ';
        if (order.size > 0) {
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

    onLimitChange(ev: LimitOptions) {
        if (this.ordering == '') {
            this.setOrdering(this.default_ordering);
        }
        this.limits = this.setLimits(ev.limited, ev.offset_amount);
        this.buildQuery();
    }

    onOrderChange(ev: Map<string, DIRECTION>) {
        this.setOrdering(ev);
        this.buildQuery();
    }

    sqlize(metrics) {
        console.log(metrics);

        return metrics.map(m => {
            let inc = 'A';
            return `${m.label} AS ${inc},`;
        });
    }

    fetch(vname, sql) {
        this.tableIsDimmed = true;
        this.dat.sendSQL({ sql: sql, sender: vname }).subscribe(data => {
            if (data.sender == vname) {

                this.tableIsDimmed = false;

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
                this.results.map(r => {
                    r.rows = rows;
                    r.columns = columns;
                });
                this.dataframe.emit(new DataFrame(data.result));
            }
        }, err => {
            console.error(err);
            this.errors = err;
        });
    }

    onFuelChange(fuels) {
        this.fuels_query = "AND (";
        console.log(fuels.length);

        if (fuels.length > 0) {
            let o_elems = [];

            fuels.map((f) => {
                console.log(f['value']);
                o_elems.push("ft.fuel_machine_type_name = '" + f['value'] + "'");
            });
            this.fuels_query += o_elems.join(`
            OR `);
            this.fuels_query += ')';

        } else {
            this.fuels_query = '';
        }
        console.log(this.fuels_query);
        this.buildQuery();
    }

    on_harvesting(ev) {
        this.harvesting_on = ev;
        this.buildQuery();
    }
}

function fastpivot(a) { "use strict"; var t = {}; if ("string" != typeof a && a.length > 0) { var l = Object.keys(a[0]), n = {}; l.forEach(function(a) { n[a] = {}, n[a]._labels = [], n[a]._labelsdata = [], n[a]._data = {} }), a.forEach(function(a, t) { l.forEach(function(t) { var l = a[t]; n[t]._data[l] = (n[t]._data[l] || 0) + 1, n[t]._labels[l] = null }) }), l.forEach(function(a) { for (var t in n[a]._data) n[a]._labelsdata.push(n[a]._data[t]); n[a]._labels = Object.keys(n[a]._labels) }), t = n } return t }
