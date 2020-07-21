import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
export interface BurnTarget {
  value: number;
  label: string;
  active: boolean;
}
@Component({
  selector: 'app-burn-target-options',
  templateUrl: './burn-target-options.component.html',
  styleUrls: ['./burn-target-options.component.css']
})
export class BurnTargetOptionsComponent implements OnInit {

  @Output() burnTargetChange = new EventEmitter<Array<BurnTarget>>();

  burn_target_options:BurnTarget[] = [
    {value: 0, label: 'PB 0', active: false},
    {value: 1, label: 'PB 1', active: false},
    {value: 3, label: 'PB 3', active: false},
    {value: 5, label: 'PB 5', active: false}
  ];

  constructor() { }

  ngOnInit() {
  }

  emit() {
    this.burnTargetChange.emit(
      this.burn_target_options
      .filter((bto) => {
        return (bto.active);
      }).map(o => { return o; })
    );
  }

}
