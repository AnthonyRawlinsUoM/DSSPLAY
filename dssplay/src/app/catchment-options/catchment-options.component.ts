import { Component, OnInit, Input } from '@angular/core';
import { Metric } from '../metrics/metrics.component';

export interface Catchment {
  id: number;
  label: string;
  color: string; // class really but thats a reserved word
  active: boolean;
}

@Component({
  selector: 'app-catchment-options',
  templateUrl: './catchment-options.component.html',
  styleUrls: ['./catchment-options.component.css']
})
export class CatchmentOptionsComponent implements OnInit {

  @Input() metrics:Array<Metric>;

  default = false;

  catchment_options: Array<Catchment> = [
    {color:'armstrong', label:'Armstrong', id:1, active: this.default},
    {color:'cement_creek_east', label:'Cement Creek East', id:2, active: this.default},
    {color:'yan_yean', label:'Yan Yean', id: 3, active: this.default},
    {color:'wallaby_creek', label:'Wallaby Creek', id: 4, active: this.default},
    {color:'greenvale', label:'Greenvale', id: 5, active: this.default},
    {color:'sugarloaf', label:'Sugarloaf', id: 6, active: this.default},
    {color:'silvan', label:'Silvan', id: 7, active: this.default},
    {color:'cardinia', label:'Cardinia', id: 8, active: this.default},
    {color:'thomson', label:'Thomson', id: 9, active: this.default},
    {color:'oshannassy', label:'O’Shannassy', id: 10, active: this.default},
    {color:'upper_yarra', label:'Upper Yarra', id: 11, active: this.default},
    {color:'starvation', label:'Starvation', id: 12, active: this.default},
    {color:'big_flume', label:'Big Flume', id: 13, active: this.default},
    {color:'mcmahons', label:'McMahons', id: 14, active: this.default},
    {color:'micks_creek', label:'Mick’s Creek', id: 15, active: this.default},
    {color:'sawpit_creek', label:'Sawpit Creek', id: 16, active: this.default},
    {color:'graceburn', label:'Graceburn', id: 17, active: this.default},
    {color:'cornanderrk', label:'Cornanderrk', id: 18, active: this.default},
    {color:'maroondah', label:'Maroondah', id: 19, active: this.default},
    {color:'donnelleys_creek', label:'Donnelley’s Creek', id: 20, active: this.default},
    {color:'tarago', label:'Tarago', id: 21, active: this.default},
    {color:'bunyip', label:'Bunyip', id: 22, active: this.default},
    {color:'crotty', label:'Crotty', id: 23, active: this.default}
  ];

  all = false;
    needed: boolean;

  constructor() { }

  ngOnInit() {
    this.metrics = [];
  }

  toggleAll() {
    this.catchment_options.map(c => {c.active = this.all;});
  }

  checkActive():boolean {
    return this.metrics.filter(m => (m.option === 'water_yield' || m.option === 'debris_flow')).some(x => (x) ? true: false);
  }
}
