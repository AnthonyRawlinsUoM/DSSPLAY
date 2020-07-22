import { Component, OnInit, EventEmitter, Output } from '@angular/core';

export interface WeatherModel {
  value: string;
  label: string;
  image: string;
  active: boolean;
}

@Component({
  selector: 'app-weather-panels',
  templateUrl: './weather-panels.component.html',
  styleUrls: ['./weather-panels.component.css']
})
export class WeatherPanelsComponent implements OnInit {
  @Output() weather = new EventEmitter<string>();

  weather_models;

  weather_model_options:WeatherModel[] = [
    {value: 'inv_exp_weather', label: 'Inverse Exponential Interpolated', image: 'inv_exp_weather.png', active: false},
    {value: 'nar_obs_weather', label: 'NARCLiM Observed', image: 'nar_obs_weather.png', active: false},
    {value: 'nar_fut_weather', label: 'NARCLiM Future', image: 'nar_fut_weather.png', active: false},
  ];

  constructor() { }

  ngOnInit() {
    this.emit();
  }

  emit() {
    this.weather_models = this.weather_model_options
    .filter((fto) => {
      return (fto.active);
    }).map(o => {
      return o;
    });

    console.log(this.weather_models);
    this.weather.emit(this.weather_models);
  }
}
