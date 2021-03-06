import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Options } from 'ng5-slider';
import { Metric } from '../metrics/metrics.component';
import { BurnTarget } from '../burn-target-options/burn-target-options.component';
import { FuelType } from '../fuel-panels/fuel-panels.component';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import { SqlBuilderService } from '../sql-builder.service';

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
    @Output() fuelChange = new EventEmitter<Array<FuelType>>();

    @Output() harvest_on = new EventEmitter<Boolean>();

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

    constructor(private dat: DataService, private builder: SqlBuilderService) { }

    ngOnInit(): void {
    }

    onYearValueChange(value) {
        this.years_lower = value;
        this.year_range.emit([value, this.years_upper]);
        this.dat.logEntry('Changing years to: ' + [value, this.years_upper]);
    }

    onYearUpperChange(highValue) {
        this.years_upper = highValue;
        this.year_range.emit([this.years_lower, highValue]);
        this.dat.logEntry('Changing years to: ' + [this.years_lower, highValue]);
    }

    onRepsValueChange(value) {
        this.reps_lower = value;
        this.reps_range.emit([value, this.reps_upper]);
        this.dat.logEntry('Changing replicates to: ' + [value, this.reps_upper]);
    }

    onRepsUpperChange(highValue) {
        this.reps_upper = highValue;
        this.reps_range.emit([this.reps_lower, highValue]);
        this.dat.logEntry('Changing replicates to: ' + [this.reps_lower, highValue]);
    }

    onBurnTargetsChange(event) {
        this.burnTargetsChange.emit(event);
        let burn_targets = event.map(bt => bt.label);
        this.dat.logEntry('Changing Burn Targets to: ' + burn_targets);
    }

    onFuelChange(event) {
        this.fuelChange.emit(event);
        this.dat.logEntry('Changing Fuel System to: ' + event);
    }

    toggleHarvesting(state) {
        this.harvesting_on = state;
        this.harvest_on.emit(this.harvesting_on);
    }

}
