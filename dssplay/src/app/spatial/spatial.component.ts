import { Output, Component, AfterViewInit, ViewChild, ElementRef, EventEmitter, OnInit, Input } from '@angular/core';
import { Map, FitBoundsOptions, LngLatBoundsLike, LngLatBounds } from 'mapbox-gl';
import { MapComponent } from 'ngx-mapbox-gl';
import { Chart, ChartData, ChartConfiguration } from 'chart.js';
import { filter, map } from 'rxjs/operators';
import { FeatureCollection, Feature, Geometry } from 'geojson';

import { easing } from 'ts-easing';

export interface Source {
  layers: any;
  data: any;
}

@Component({
  selector: 'app-spatial',
  templateUrl: './spatial.component.html',
  styleUrls: ['./spatial.component.css']
})
export class SpatialComponent implements OnInit {
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

    movingOptions: FitBoundsOptions = { padding: 30, easing: (x) => { return easing.quadratic(x) } };

  mapviewer?: MapComponent;

  style = "mapbox://styles/anthonyrawlinsuom/ckctrexe332ho1inaqb2ul5x9";

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.bounds = new LngLatBounds([129.5, -43.47, 153.6, -27.45]);
    // }, 2000)
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
