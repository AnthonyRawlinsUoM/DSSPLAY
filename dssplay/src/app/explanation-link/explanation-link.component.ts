import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-explanation-link',
  templateUrl: './explanation-link.component.html',
  styleUrls: ['./explanation-link.component.css']
})
export class ExplanationLinkComponent implements OnInit {

    @Input() help;

    showhelp;

  constructor() { }

  ngOnInit() {
      this.showhelp = false;
  }

}
