import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Options } from 'ng5-slider';
import { FormGroup, FormControl } from '@angular/forms';
import { BurnTarget } from '../burn-target-options/burn-target-options.component';

@Component({
  selector: 'app-temporal-options',
  templateUrl: './temporal-options.component.html',
  styleUrls: ['./temporal-options.component.css']
})
export class TemporalOptionsComponent implements OnInit {
  @Output() year_range = new EventEmitter<any>();
  @Output() burnTargetChange = new EventEmitter<Array<BurnTarget>>();

  yearGroup: FormGroup = new FormGroup({
    sliderControl: new FormControl([20, 80])
  });

  value = 0;
  highValue = 100;
  options: Options = {
    floor: 0,
    ceil: 100
  };
  constructor() { }

  ngOnInit(): void {
  }

  onValueChange(value) {}
  onHighValueChange(highValue) {}

  onBurnTargetChange(evt) {
    this.burnTargetChange.emit(evt);
  }
}
