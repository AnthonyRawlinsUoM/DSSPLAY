import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() title;
  @Input() version;
  @Input() routes;
  @Input() codename;

  constructor() { }

  ngOnInit(): void {
  }

}
