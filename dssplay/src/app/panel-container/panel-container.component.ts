import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-panel-container',
  templateUrl: './panel-container.component.html',
  styleUrls: ['./panel-container.component.css']
})
export class PanelContainerComponent implements OnInit {

    @Input() mode: string;

  constructor() { }

  ngOnInit() {
  }

}
