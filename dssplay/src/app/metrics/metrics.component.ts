import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface Metric {
  name:string;
  value:string;
  label:string;
}

export enum MODE {
  spatial = 'spatial',
  temporal = 'temporal'
}

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})
export class MetricsComponent implements OnInit {
  @Input() metrics: Array<Metric>;
  @Input() mode;
  @Output() metricChange = new EventEmitter<Array<Metric>>();

  selected;
  options;

  initvals = [
    {label: 'House Loss', option: 'house_loss', results: MODE.temporal},
    {label: 'Life Loss', option: 'life_loss', results: MODE.temporal},
    {label: 'Biodiversity', option: 'bio_diversity', results: MODE.temporal},
    {label: 'Viewshed', option: 'viewshed', results: MODE.temporal},
    {label: 'Carbon', option: 'carbon', results: MODE.temporal},
    {label: 'Debris Flow', option: 'debris_flow', results: MODE.spatial},
    {label: 'Water Yield', option: 'water_yield', results: MODE.spatial},
    {label: 'RUSLE', option: 'rusle', results: MODE.spatial},
    {label: 'Mean Erosion Rate', option: 'mean_erosion_rate', results: MODE.spatial},
    {label: 'Infrastructure', option: 'infrastructure', results: MODE.temporal},
    {label: 'Prescribed Burn', option: 'p_burn', results: MODE.temporal},
    {label: 'GMA', option: 'gma', results: MODE.temporal}
  ];

  constructor() {
  }

  ngOnInit(): void {
    this.options = this.initvals.filter(so => so.results.toString() === this.mode)
    .map(so => {
      console.log(so);
      return so;
    });
  }

  onSelectedOptionsChange(event) {

    let result = [];

    this.selected.map(s => {
      return this.initvals.filter(iv => iv.option === s)
      .map(iv => {
        result.push(iv);
      })
    })

    this.metricChange.emit(result);
  }
}
