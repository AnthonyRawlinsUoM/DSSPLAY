import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-frappeator-projects',
  templateUrl: './frappeator-projects.component.html',
  styleUrls: ['./frappeator-projects.component.css']
})
export class FrappeatorProjectsComponent implements OnInit {

  @Input() rows;
  @Input() columns;
  @Output() selections = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
