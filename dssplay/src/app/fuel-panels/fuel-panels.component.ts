import { Component, OnInit, EventEmitter, Output } from '@angular/core';

export interface FuelType {
  value: string;
  label: string;
  image: string;
  active: boolean;
}

@Component({
  selector: 'app-fuel-panels',
  templateUrl: './fuel-panels.component.html',
  styleUrls: ['./fuel-panels.component.css']
})
export class FuelPanelsComponent implements OnInit {

  @Output() fuel = new EventEmitter<string>();

  fuel_types;

  fuel_type_options:FuelType[] = [
    {value: 'inv_exp_fuel', label: 'Inverse Exponential with LANDIS', image: 'inv_exp_fuel.png', active: false},
    {value: 'nar_obs_fuel', label: 'NARCLiM Observed with LANDIS', image: 'nar_obs_fuel.png', active: false},
    {value: 'nar_fut_fuel', label: 'NARCLiM Future with LANDIS', image: 'nar_fut_fuel.png', active: false},
  ];


  constructor() { }

  ngOnInit() {
    this.emit();
  }

  emit() {
    this.fuel_types = this.fuel_type_options
    .filter((fto) => {
      return (fto.active);
    }).map(o => {
      return o;
    });

    console.log(this.fuel_types);
    this.fuel.emit(this.fuel_types);
  }
}
