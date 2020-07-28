import { Output, Component, AfterViewInit, ViewChild, ElementRef, EventEmitter, OnInit, Input } from '@angular/core';
import { Map, FitBoundsOptions, LngLatBoundsLike, LngLatBounds, Source } from 'mapbox-gl';
import { MapComponent } from 'ngx-mapbox-gl';
import { Chart, ChartData, ChartConfiguration } from 'chart.js';
import { filter, map } from 'rxjs/operators';
import { FeatureCollection, Feature, Geometry } from 'geojson';

import { easing } from 'ts-easing';

// export interface Source {
//   layers: any;
//   data: any;
// }

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.css']
})
export class MappingComponent implements OnInit {
  @ViewChild('mapview', { static: false }) mapview: Map;

  @Input() focus?: any = { "type": "FeatureCollection", "features": [] };
  @Output() hoveredStateId = null;
  @Output() selectedAreaId = null;
  @Output() selectedArea = null;
  @Output() boundsChange = new EventEmitter<any>();

  sources: Source[] = [];

  zoom = [7.78];

  bounds: any;
  boundsOptions;
  metrics;

  options_panel = true;
  series_panel = true;
  export_panel = true;

    movingOptions: FitBoundsOptions = { padding: 30, easing: (x) => { return easing.quadratic(x) } };

  mapviewer?: MapComponent;

  style = "mapbox://styles/anthonyrawlinsuom/ckctrexe332ho1inaqb2ul5x9";
    burnTargets: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.bounds = new LngLatBounds([129.5, -43.47, 153.6, -27.45]);
    // }, 2000)
  }

  onBurnTargetsChange(event) {
    this.burnTargets = event;
  }

  onMetricsChange(event) {
    this.metrics = event;
  }
  onBoundsChange(bounds:LngLatBounds) {
    console.log('Moving!');
    this.bounds = bounds;
  }

  mousemove(evt) {
    console.log(evt);
  }

  mapLoaded(evt) {
    console.log(evt);
  }
}
