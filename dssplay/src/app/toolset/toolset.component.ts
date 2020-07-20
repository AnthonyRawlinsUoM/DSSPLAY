import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-toolset',
  templateUrl: './toolset.component.html',
  styleUrls: ['./toolset.component.css']
})
export class ToolsetComponent implements OnInit {

  @Input() mode;

  options_panel = true;
  series_panel = true;
  export_panel = true;


  constructor() { }

  ngOnInit(): void {
  }

}
