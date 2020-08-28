import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { FuelType } from '../fuel-panels/fuel-panels.component';

import { LimitOptions, DIRECTION } from '../dataframe-table/dataframe-table.component';
import { of } from 'rxjs';



export interface DataFrame {

}


@Component({
    selector: 'app-sql-controller',
    templateUrl: './sql-controller.component.html',
    styleUrls: ['./sql-controller.component.css']
})
export class SqlControllerComponent implements OnInit {

    show_sidebar = false;
    query;
    tableIsDimmed = false;
    metrics_tables;
    burnTargets;
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
        this.dat.logEntry('Initiating SQLQueryController()');
        this.limits = this.setLimits(1000, 0); // Set tiny for testing
        this.default_ordering = new Map();
        this.default_ordering.set('job.planburn_target_perc', DIRECTION.ASC);
        this.default_ordering.set('Season', DIRECTION.ASC);
        this.setOrdering(this.default_ordering);
    }

    onMetricsChange(m) {
        console.log('Got metrics change event.');
        this.metrics_tables = m.map(m => m.option);
        this.buildQuery();
    }

    onBurnTargetsChange(bt) {
        console.log('Got burn targets change');
        console.log(bt);
        this.burnTargets = [];
        bt.map((b) => {
            console.log(b);
            this.burnTargets.push(b['value']);
        });
        console.log('BurnTargets after mapping: ', this.burnTargets);

        this.burns_query = `AND (
            `;

        if (this.burnTargets.length > 0) {
            let o_elems = [];

            this.burnTargets.map((b) => o_elems.push(`job.planburn_target_perc = ${b}`));
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
