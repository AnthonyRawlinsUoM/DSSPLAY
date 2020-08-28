import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface Fuel {
  label:string;
  option:string;
}

@Component({
  selector: 'app-fuel-options',
  templateUrl: './fuel-options.component.html',
  styleUrls: ['./fuel-options.component.css']
})
export class FuelOptionsComponent implements OnInit {

  @Output() fuel = new EventEmitter<Fuel>();

  fuel_options = [
    {label: 'Inverse Exponential with LANDIS', option: 'invexp'},
    {label: 'NARCLIM Future with LANDIS', option: 'future_landis_fuel'},
    {label: 'NARCLIM Observed with LANDIS', option: 'observed_landis_fuel'}
  ]

  fuel_choice;

  constructor() { }

  ngOnInit() {
  }

}
