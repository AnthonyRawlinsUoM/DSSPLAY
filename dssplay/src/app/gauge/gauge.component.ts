import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css']
})
export class GaugeComponent implements OnInit {


    // Example only - TODO
    gaugeType = "arch";
    gaugeCap="round";
    gaugeValue = 28.3;
    gaugeLabel = "Life Loss";
    gaugeAppendText = "lives/year";
    gaugeColor = "#2274a5";

  constructor() { }

  ngOnInit() {
  }

}
