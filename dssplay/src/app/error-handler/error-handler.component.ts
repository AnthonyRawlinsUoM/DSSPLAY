import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.css']
})
export class ErrorHandlerComponent implements OnInit {

    errors;

    constructor(private dat: DataService) {}

    ngOnInit() {
        this.dat.getErrors().subscribe(e=> {
            this.errors = e;
        },
        err => {
            console.error(err);
        });
      }
}
