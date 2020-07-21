import { Component } from '@angular/core';
// import {TransitionController} from "ng2-semantic-ui";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    // public transitionController = new TransitionController();

  title = 'Frozone';
  version = '0.0.1';
  codename = 'DSSPlay';

  routes = [
    {
      path: '/',
      name: 'Home',
      icon: 'home icon'
    },
    {
      path: 'mapping',
      name: 'Mapping',
      icon: 'map icon'
    },
    {
      path: 'charting',
      name: 'Charting',
      icon: 'line chart icon'
    },
  ];
}
