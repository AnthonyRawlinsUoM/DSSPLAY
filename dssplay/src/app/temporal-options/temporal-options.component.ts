import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Options } from 'ng5-slider';
import { FormGroup, FormControl } from '@angular/forms';
import { BurnTarget } from '../burn-target-options/burn-target-options.component';
import { Metric } from '../metrics/metrics.component';

@Component({
  selector: 'app-temporal-options',
  templateUrl: './temporal-options.component.html',
  styleUrls: ['./temporal-options.component.css']
})
export class TemporalOptionsComponent implements OnInit {
  @Input() value = 0;
  @Input() highValue = 100;
  @Input() metrics: Array<Metric>;
  @Input() burnTargets: Array<BurnTarget>;

  @Output() year_range = new EventEmitter<any>();
  @Output() metricsChange = new EventEmitter<Array<Metric>>();
  @Output() burnTargetsChange = new EventEmitter<Array<BurnTarget>>();

  yearGroup: FormGroup = new FormGroup({
    sliderControl: new FormControl([20, 80])
  });

x
  options: Options = {
    floor: 0,
    ceil: 100
  };
  constructor() { }

  ngOnInit(): void {
  }

  onValueChange(value) {
    this.year_range.emit([value, this.highValue]);
  }

  onHighValueChange(highValue) {
    this.year_range.emit([this.value, highValue]);
  }

  onBurnTargetsChange(event){
    this.burnTargetsChange.emit(event);
  }
}
