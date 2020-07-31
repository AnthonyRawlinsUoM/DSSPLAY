import { Component, OnInit } from '@angular/core';
import { Envelope, DataService } from '../data.service';
import * as dataforge from 'data-forge';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  results = [
      {name: 'houses_lost', rows: [], columns: []},
      {name: 'houses_exposed', rows: [], columns: []},
      {name: 'people_exposed', rows: [], columns: []}
  ];

  errors;
  selectedPage;

  constructor(private dat: DataService) { }

  ngOnInit() {

      this.fetch('houses_exposed', `

      SELECT houses_exposed, regime_id, scenario_id, replicate_id
      FROM peoplehouseloss

      `);

      this.fetch('people_exposed', `

      SELECT people_exposed, regime_id, scenario_id, replicate_id
      FROM peoplehouseloss

      `);

      this.fetch('houses_lost', `

      SELECT houses_lost, regime_id, scenario_id, replicate_id
      FROM peoplehouseloss

      `);

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
