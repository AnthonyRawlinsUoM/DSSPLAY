import { Component, OnInit, Input, TemplateRef, ViewContainerRef  } from '@angular/core';

@Component({
  selector: 'app-viewpanel',
  templateUrl: './viewpanel.component.html',
  styleUrls: ['./viewpanel.component.css']
})
export class ViewpanelComponent implements OnInit {

  @Input() mode: string;

  constructor() { }

  ngOnInit() {
    this.mode = 'horizontal';
  }

}
