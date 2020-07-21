import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BurnTarget } from '../burn-target-options/burn-target-options.component';
import { Metric } from '../metrics/metrics.component';

@Component({
  selector: 'app-toolset',
  templateUrl: './toolset.component.html',
  styleUrls: ['./toolset.component.css']
})
export class ToolsetComponent implements OnInit {
  @Input() mode;

  @Output() burnTargetChange = new EventEmitter<Array<BurnTarget>>();
  @Output() metricChange = new EventEmitter<Array<Metric>>();

  options_panel = true;
  series_panel = true;
  export_panel = true;


  constructor() { }

  ngOnInit(): void {
  }

  onBurnTargetChange(event) {
    this.burnTargetChange.emit(event);
  }

  onMetricChange(event) {
    this.metricChange.emit(event);
  }

}
