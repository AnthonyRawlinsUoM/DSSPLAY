import { Component, OnInit } from '@angular/core';

export interface Viewshed {
  idx:number;
  fid:number;
  objectid: number;
  label:string;
  geometry: string;
}

@Component({
  selector: 'app-viewshed-options',
  templateUrl: './viewshed-options.component.html',
  styleUrls: ['./viewshed-options.component.css']
})
export class ViewshedOptionsComponent implements OnInit {

  viewshed_options: Array<Viewshed> = [
    {idx:0,	fid: 573, objectid:	214008, label: 'Healesville', geometry: ''},
    {idx:1,	fid: 575, objectid:	214010, label: 'Kilmore', geometry: ''},
    {idx:2,	fid: 581, objectid:	214016, label: 'Seymour', geometry: ''},
    {idx:3,	fid: 583, objectid:	214018, label: 'Wallan', geometry: ''},
    {idx:4,	fid: 587, objectid:	215002, label: 'Alexandra', geometry: ''},
    {idx:5,	fid: 595, objectid:	215010, label: 'Beaconsfield Upper', geometry: ''},
    {idx:6,	fid: 598, objectid:	215013, label: 'Beveridge', geometry: ''},
    {idx:7,	fid: 601, objectid:	215016, label: 'Broadford', geometry: ''},
    {idx:8,	fid: 617, objectid:	215032, label: 'Euroa', geometry: ''},
    {idx:9,	fid: 621, objectid:	215036, label: 'Gembrook', geometry: ''},
    {idx:10,	fid: 637, objectid:	215052, label: 'Mansfield', geometry: ''},
    {idx:11,	fid: 639, objectid:	215054, label: 'Millgrove', geometry: ''},
    {idx:12,	fid: 644, objectid:	215059, label: 'Nagambie', geometry: ''},
    {idx:13,	fid: 661, objectid:	215076, label: 'Seville', geometry: ''},
    {idx:14,	fid: 669, objectid:	215084, label: 'Wandong - Heathcote Junction', geometry: ''},
    {idx:15,	fid: 670, objectid:	215085, label: 'Warburton', geometry: ''},
    {idx:16,	fid: 672, objectid:	215087, label: 'Whittlesea', geometry: ''},
    {idx:17,	fid: 674, objectid:	215089, label: 'Wonga Park', geometry: ''}
  ];

  constructor() { }

  ngOnInit() {
  }

}
