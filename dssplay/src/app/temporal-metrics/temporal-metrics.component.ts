import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Metric } from '../metrics/metrics.component';

@Component({
  selector: 'app-temporal-metrics',
  templateUrl: './temporal-metrics.component.html',
  styleUrls: ['./temporal-metrics.component.css']
})
export class TemporalMetricsComponent implements OnInit {
    @Input() metrics:Array<Metric>;
  @Output() metricsChange = new EventEmitter<Array<Metric>>();
  constructor() { }

  ngOnInit(): void {
  }

}
