import { Component, OnInit } from '@angular/core';
import { Envelope, DataService } from '../data.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private dat: DataService) { }
  houses_lost;
  houses_exposed;
  people_exposed;
  errors;

  ngOnInit() {
      this.dat.getErrors().subscribe(e=> {
          this.errors = e;
      },
      err => {
          console.error(err);
      });

      this.dat.sendSQL({sql:`

      SELECT houses_exposed, regime_id, scenario_id, replicate_id
      FROM peoplehouseloss

      `, sender: 'houses_exposed'}).subscribe(data => {
          if (data.sender == 'houses_exposed') this.houses_exposed = data.result;
      }, err => {
          console.error(err);
          this.errors = err;
      });

      this.dat.sendSQL({sql:`

      SELECT houses_lost, regime_id, scenario_id, replicate_id
      FROM peoplehouseloss

      `, sender: 'houses_lost'}).subscribe(data => {
          if (data.sender == 'houses_lost') this.houses_lost = data.result;
      }, err => {
          console.error(err);
          this.errors = err;
      });

      this.dat.sendSQL({sql:`

      SELECT people_exposed, regime_id, scenario_id, replicate_id
      FROM peoplehouseloss

      `, sender: 'people_exposed'}).subscribe(data => {
          if (data.sender == 'people_exposed') this.people_exposed = data.result;
      }, err => {
          console.error(err);
          this.errors = err;
      });
  }

}
