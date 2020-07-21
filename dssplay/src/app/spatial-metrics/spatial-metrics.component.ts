import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Metric } from '../metrics/metrics.component';

@Component({
  selector: 'app-spatial-metrics',
  templateUrl: './spatial-metrics.component.html',
  styleUrls: ['./spatial-metrics.component.css']
})
export class SpatialMetricsComponent implements OnInit {
  @Input() metrics:Array<Metric>;
  @Output() metricsChange = new EventEmitter<Array<Metric>>();

  constructor() { }

  ngOnInit(): void {
  }
}
