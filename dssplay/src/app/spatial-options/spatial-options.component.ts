import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-spatial-options',
  templateUrl: './spatial-options.component.html',
  styleUrls: ['./spatial-options.component.css']
})
export class SpatialOptionsComponent implements OnInit {
  value = 0;
  highValue = 100;
  options: Options = {
    floor: 0,
    ceil: 100
  };

  constructor() { }

  ngOnInit(): void {
  }

}
