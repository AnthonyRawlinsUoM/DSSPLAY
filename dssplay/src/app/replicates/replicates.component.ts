import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Options } from 'ng5-slider';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-replicates',
  templateUrl: './replicates.component.html',
  styleUrls: ['./replicates.component.css']
})
export class ReplicatesComponent implements OnInit {
    @Output() repsRangeChange = new EventEmitter<any>()

    reps_lower = 0;
    reps_upper = 50;

    repsGroup: FormGroup = new FormGroup({
        sliderRepsControl: new FormControl([0, 50])
    });

    reps_options: Options = {
        floor: 0,
        ceil: 50
    };

  constructor(private data: DataService) { }

  ngOnInit() {
  }

  onRepsValueChange(value) {
      this.reps_lower = value;
      this.repsRangeChange.emit([value, this.reps_upper]);
      this.data.logEntry('Changing replicates to: ' + [value, this.reps_upper]);
  }

  onRepsUpperChange(highValue) {
      this.reps_upper = highValue;
      this.repsRangeChange.emit([this.reps_lower, highValue]);
      this.data.logEntry('Changing replicates to: ' + [this.reps_lower, highValue]);
  }

}
