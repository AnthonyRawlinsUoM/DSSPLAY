import { Component, OnInit, Input } from '@angular/core';
import {TransitionController, Transition, TransitionDirection} from "ngx-fomantic-ui";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() title;
  @Input() routes;

  about = false;

  public transitionController = new TransitionController();

  constructor() { }

  ngOnInit(): void {
    this.transitionController.stopAll();
    this.transitionController.animate(
        new Transition('slide', 500, TransitionDirection.Out));
  }

  onmouseenter(evt) {
    // console.log('entering');
    this.transitionController.stopAll();
    this.transitionController.animate(
        new Transition('slide', 500, TransitionDirection.In));
  }
  onmouseover(evt) {
    // console.log('over');
  }
  onmouseleave(evt) {
    // console.log('leaving');
    this.transitionController.stopAll();
    this.transitionController.animate(
        new Transition('slide', 500, TransitionDirection.Out));
  }

  public animate(transitionName:string = "scale") {
        this.transitionController.animate(
            new Transition(transitionName, 500, TransitionDirection.In, () => console.log("Completed transition.")));
    }
}
