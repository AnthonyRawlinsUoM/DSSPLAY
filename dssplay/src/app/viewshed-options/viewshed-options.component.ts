import { Component, OnInit, Input } from '@angular/core';
import { Metric } from '../metrics/metrics.component';

export interface Viewshed {
  idx:number;
  fid:number;
  objectid: number;
  label:string;
  geometry: any[];
  active: boolean;
  color: string;
}

@Component({
  selector: 'app-viewshed-options',
  templateUrl: './viewshed-options.component.html',
  styleUrls: ['./viewshed-options.component.css']
})
export class ViewshedOptionsComponent implements OnInit {

    @Input() metrics:Array<Metric>;

  default = false;

  viewshed_options: Array<Viewshed> = [
    {idx:0,	fid: 573, objectid:	214008, label: 'Healesville', geometry: [], active: this.default, color: 'healesville'},
    {idx:1,	fid: 575, objectid:	214010, label: 'Kilmore', geometry: [], active: this.default, color: 'kilmore'},
    {idx:2,	fid: 581, objectid:	214016, label: 'Seymour', geometry: [], active: this.default, color: 'seymour'},
    {idx:3,	fid: 583, objectid:	214018, label: 'Wallan', geometry: [], active: this.default, color: 'wallan'},
    {idx:4,	fid: 587, objectid:	215002, label: 'Alexandra', geometry: [], active: this.default, color: 'alexandra'},
    {idx:5,	fid: 595, objectid:	215010, label: 'Beaconsfield Upper', geometry: [], active: this.default, color: 'beaconsfield_upper'},
    {idx:6,	fid: 598, objectid:	215013, label: 'Beveridge', geometry: [], active: this.default, color: 'beveridge'},
    {idx:7,	fid: 601, objectid:	215016, label: 'Broadford', geometry: [], active: this.default, color: 'broadford'},
    {idx:8,	fid: 617, objectid:	215032, label: 'Euroa', geometry: [], active: this.default, color: 'euroa'},
    {idx:9,	fid: 621, objectid:	215036, label: 'Gembrook', geometry: [], active: this.default, color: 'gembrook'},
    {idx:10,	fid: 637, objectid:	215052, label: 'Mansfield', geometry: [], active: this.default, color: 'mansfield'},
    {idx:11,	fid: 639, objectid:	215054, label: 'Millgrove', geometry: [], active: this.default, color: 'millgrove'},
    {idx:12,	fid: 644, objectid:	215059, label: 'Nagambie', geometry: [], active: this.default, color: 'nagambie'},
    {idx:13,	fid: 661, objectid:	215076, label: 'Seville', geometry: [], active: this.default, color: 'seville'},
    {idx:14,	fid: 669, objectid:	215084, label: 'Wandong - Heathcote Junction', geometry: [], active: this.default, color: 'wandong_heathcote_junction'},
    {idx:15,	fid: 670, objectid:	215085, label: 'Warburton', geometry: [], active: this.default, color: 'warburton'},
    {idx:16,	fid: 672, objectid:	215087, label: 'Whittlesea', geometry: [], active: this.default, color: 'whittlesea'},
    {idx:17,	fid: 674, objectid:	215089, label: 'Wonga Park', geometry: [], active: this.default, color: 'wonga Park'}
  ];

  all = false;
    needed: boolean;

  constructor() { }

  ngOnInit() {
    this.metrics = [];
  }

  toggleAll() {
    this.viewshed_options.map(c => {c.active = this.all;});
  }

  checkActive():boolean {
    return this.metrics
    .filter(m => m.option === 'viewshed').some(x => (x) ? true: false);
  }
}
