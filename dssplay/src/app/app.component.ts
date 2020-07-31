import { Component } from '@angular/core';
// import {TransitionController} from "ng2-semantic-ui";
import { environment } from '../environments/environment';
import { DataService } from './data.service';

const version = environment.version;
const title = environment.name;

export interface LogEntry {
    timestamp;
    entry;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    // public transitionController = new TransitionController();

  title = title;
  version = version;

  log_entries = [];

  routes = [
    {
      path: '/',
      name: 'Home',
      icon: 'home icon'
    },
    {
      path: 'reports',
      name: 'Reports',
      icon: 'line chart icon'
    },

  ];

  constructor(private dat: DataService) {
      this.dat.getLog().subscribe(log => {
          this.log_entries.push(log);
      })
  }

}
