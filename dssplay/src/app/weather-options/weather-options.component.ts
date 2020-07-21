import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface Weather {
  label:string;
  option:string;
}
@Component({
  selector: 'app-weather-options',
  templateUrl: './weather-options.component.html',
  styleUrls: ['./weather-options.component.css']
})
export class WeatherOptionsComponent implements OnInit {
  @Output() weather = new EventEmitter<Weather>();


  weather_options = [
    {
      label: 'Inverse Exponential Interpolator',
      option: 'inv_exp'
    },{
      label: 'NARCLIM Future',
      option: 'NARCLIM_future'
    },{
      label: 'NARCLIM Observed',
      option: 'NARCLIM_observed'
    },
  ];

  weather_choice;

  constructor() { }

  ngOnInit() {
  }

}
