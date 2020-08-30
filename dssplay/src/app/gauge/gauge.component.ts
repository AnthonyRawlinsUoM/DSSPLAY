import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css']
})
export class GaugeComponent implements OnInit {
    @Input() gaugeValue;
    @Input() gaugeLabel;
    @Input() gaugeAppendText;

    // Example only - TODO
    gaugeType = "arch";
    gaugeCap="round";
    gaugeColor = "#2274a5";

  constructor() { }

  ngOnInit() {
  }

}
