import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Metric } from '../metrics/metrics.component';

@Component({
  selector: 'app-temporal-metrics',
  templateUrl: './temporal-metrics.component.html',
  styleUrls: ['./temporal-metrics.component.css']
})
export class TemporalMetricsComponent implements OnInit {
  @Output() metricChange = new EventEmitter<Array<Metric>>();
  constructor() { }

  ngOnInit(): void {
  }

  onMetricChange(event) {
    console.log('Temporal Metrics');
    console.log(event);
    this.metricChange.emit(event);
  }

}
