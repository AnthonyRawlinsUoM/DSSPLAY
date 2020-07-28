import { Component } from '@angular/core';
// import {TransitionController} from "ng2-semantic-ui";
import {environment } from '../environments/environment';

const version = environment.version;
const title = environment.title;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    // public transitionController = new TransitionController();

  title = title;
  version = version;

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
}
