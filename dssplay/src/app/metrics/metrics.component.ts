import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface Metric {
  // results: string; // Deprecated
  option: string;
  label: string;
  color: string;
  border: string;
}

// export enum MODE {
//   mapping = 'mapping',
//   charting = 'charting',
//   statistical = 'statistical'
// }

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})
export class MetricsComponent implements OnInit {
  @Input() mode;
  @Input() metrics: Array<Metric> = [];
  @Output() metricsChange = new EventEmitter<Array<Metric>>();

  selected = [];
  options;

  initvals = [
    { label: 'House Loss', option: 'house_loss', color: 'rgba(74, 31, 31, 0.67)', border: '#4A1F1F'},
    { label: 'Life Loss', option: 'life_loss', color: 'rgba(168, 95, 41, 0.67)', border: '#A85F29'},
    { label: 'Biodiversity', option: 'bio_diversity', color: 'rgba(73, 96, 9, 0.67)', border: '#496009'},
    { label: 'Viewshed', option: 'viewshed', color: 'rgba(11, 135, 162, 0.67)', border: '#0B87A2' },
    { label: 'Carbon', option: 'carbon', color: 'rgba(0,0,0, 0.68)', border: '#000000' },
    { label: 'Debris Flow', option: 'debris_flow', color: 'rgba(39, 56, 89, 0.67)', border: '#273859' },
    { label: 'Water Yield', option: 'water_yield', color: 'rgba(13, 88, 158, 0.67)', border: '#0D589E' },
    { label: 'RUSLE', option: 'rusle', color: 'rgba(83, 87, 23, 0.67)', border: '#535717' },
    { label: 'Mean Erosion Rate', option: 'mean_erosion_rate', color: 'rgba(61, 38, 51, 0.68)', border: '#3D2633' },
    { label: 'Infrastructure', option: 'infrastructure', color: 'rgba(18, 107, 56, 0.66)', border: '#126B38' },
    // { label: 'Prescribed Burn', option: 'p_burn', results: MODE.charting, color: 'rgba(236, 115, 27, 0.67)', border: '#EC731B' },
    { label: 'GMA', option: 'gma', color: 'rgba(30, 38, 222, 0.67)', border: '#1E26DE' }
  ];

  constructor() {
  }

  ngOnInit(): void {
    this.options = this.initvals
      .map(so => {
        console.log(so);
        return so;
      });

      // init
      let result = [];

      this.selected
      .map(s => {
        this.initvals
        .filter(iv => iv.option === s)
          .map(iv => result.push(iv))
      });

      this.metrics = result;
      this.metricsChange.emit(this.metrics);

  }

  onSelectedOptionsChange(event) {

    console.log('SUI Multi Select ' + event);

    let result = [];

    event
    .map(s => {
      this.initvals
      .filter(iv => iv.option === s)
        .map(iv => result.push(iv))
    });

    this.metrics = result;
    this.metricsChange.emit(this.metrics);
  }

  public styling(o) {
    return '{ color: ' + o.color + '; border: 1px solid ' + o.border + '; }';
  }

  // Gets aroung the incompatability of ngx-fomantic-ui and the ng-template for options
  public formatter(option:any, query?:string):string {
    return `<i class="${option.option} circle icon"></i> ${option.label}`;
}
}
