import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Options } from 'ng5-slider';
import { Metric } from '../metrics/metrics.component';
import { BurnTarget } from '../burn-target-options/burn-target-options.component';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-mapping-options',
  templateUrl: './mapping-options.component.html',
  styleUrls: ['./mapping-options.component.css']
})
export class MappingOptionsComponent implements OnInit {

  @Input() metrics: Array<Metric>;
  @Input() burnTargets: Array<BurnTarget>;

  @Output() year_range = new EventEmitter<any>();
  @Output() reps_range = new EventEmitter<any>();

  @Output() metricsChange = new EventEmitter<Array<Metric>>();
  @Output() burnTargetsChange = new EventEmitter<Array<BurnTarget>>();

  years_lower = 0;
  years_upper = 50;
  yearGroup: FormGroup = new FormGroup({
    sliderYearsControl: new FormControl([0, 50])
  });
  
  years_options: Options = {
    floor: 0,
    ceil: 50
  };

  reps_lower = 0;
  reps_upper = 50;

  repsGroup: FormGroup = new FormGroup({
    sliderRepsControl: new FormControl([0, 50])
  });

  reps_options: Options = {
    floor: 0,
    ceil: 50
  };

  harvesting_on = false;
  harvesting_off = true;

  absolute_or_relative_terms = 'absolute'; // or 'relative'

  constructor() { }

  ngOnInit(): void {
  }

  onYearValueChange(value) {
    this.year_range.emit([value, this.years_upper]);
  }

  onYearUpperChange(highValue) {
    this.year_range.emit([this.years_lower, highValue]);
  }

  onRepsValueChange(value) {
    this.reps_range.emit([value, this.reps_upper]);
  }

  onRepsUpperChange(highValue) {
    this.reps_range.emit([this.reps_lower, highValue]);
  }

  onBurnTargetsChange(event){
    this.burnTargetsChange.emit(event);
  }
}
