import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Options } from 'ng5-slider';
import { Metric } from '../metrics/metrics.component';
import { BurnTarget } from '../burn-target-options/burn-target-options.component';

@Component({
  selector: 'app-spatial-options',
  templateUrl: './spatial-options.component.html',
  styleUrls: ['./spatial-options.component.css']
})
export class SpatialOptionsComponent implements OnInit {

  @Input() metrics: Array<Metric>;
  @Output() metricsChange = new EventEmitter<Array<Metric>>();

  @Input() burnTargets: Array<BurnTarget>;
  @Output() burnTargetsChange = new EventEmitter<Array<BurnTarget>>();

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
