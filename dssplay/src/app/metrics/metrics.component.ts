import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface Metric {
  results: string;
  option: string;
  label: string;
  color: string;
  border: string;
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
    { label: 'House Loss', option: 'house_loss', results: MODE.temporal, color: 'rgba(74, 31, 31, 0.67)', border: '#4A1F1F'},
    { label: 'Life Loss', option: 'life_loss', results: MODE.temporal, color: 'rgba(168, 95, 41, 0.67)', border: '#A85F29'},
    { label: 'Biodiversity', option: 'bio_diversity', results: MODE.temporal, color: 'rgba(73, 96, 9, 0.67)', border: '#496009'},
    { label: 'Viewshed', option: 'viewshed', results: MODE.temporal, color: 'rgba(11, 135, 162, 0.67)', border: '#0B87A2' },
    { label: 'Carbon', option: 'carbon', results: MODE.temporal, color: 'rgba(0,0,0, 0.68)', border: '#000000' },
    { label: 'Debris Flow', option: 'debris_flow', results: MODE.spatial, color: 'rgba(39, 56, 89, 0.67)', border: '#273859' },
    { label: 'Water Yield', option: 'water_yield', results: MODE.spatial, color: 'rgba(13, 88, 158, 0.67)', border: '#0D589E' },
    { label: 'RUSLE', option: 'rusle', results: MODE.spatial, color: 'rgba(83, 87, 23, 0.67)', border: '#535717' },
    { label: 'Mean Erosion Rate', option: 'mean_erosion_rate', results: MODE.spatial, color: 'rgba(61, 38, 51, 0.68)', border: '#3D2633' },
    { label: 'Infrastructure', option: 'infrastructure', results: MODE.temporal, color: 'rgba(18, 107, 56, 0.66)', border: '#126B38' },
    { label: 'Prescribed Burn', option: 'p_burn', results: MODE.temporal, color: 'rgba(236, 115, 27, 0.67)', border: '#EC731B' },
    { label: 'GMA', option: 'gma', results: MODE.temporal, color: 'rgba(30, 38, 222, 0.67)', border: '#1E26DE' }
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

  public styling(o) {
    return '{ color: ' + o.color + '; border: 1px solid ' + o.border + '; }';
  }
}
