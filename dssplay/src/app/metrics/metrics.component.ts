import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface Metric {
  name:string;
  value:string;
  label:string;
}

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})
export class MetricsComponent implements OnInit {
  @Input() metrics: Array<Metric>;
  @Output() activeMetrics: Array<Metric>;

  selected;

  options = [
    {label: 'House Loss', option: '1'},
    {label: 'Life Loss', option: '2'},
    {label: 'Biodiversity', option: '2'},
    {label: 'Viewshed', option: '2'},
    {label: 'Carbon', option: '2'},
    {label: 'Debris Flow', option: '2'},
    {label: 'Water Yield', option: '2'},
    {label: 'RUSLE', option: '2'},
    {label: 'Mean Erosion Rate', option: '2'},
    {label: 'Infrastructure', option: '2'},
    {label: 'Prescribed Burn', option: '2'},
    {label: 'GMA', option: '2'}
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
