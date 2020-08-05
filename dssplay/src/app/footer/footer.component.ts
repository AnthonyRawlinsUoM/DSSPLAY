import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() title;
  @Input() version;
  @Input() routes;

  constructor(private dat: DataService) {
      this.dat.logEntry('Testing: 1!');
      this.dat.logEntry('Testing: 2!');
      this.dat.logEntry('Testing: 3!');
  }

  ngOnInit(): void {
  }

}
