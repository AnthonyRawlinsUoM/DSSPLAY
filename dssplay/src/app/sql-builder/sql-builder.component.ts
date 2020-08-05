import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sql-builder',
  templateUrl: './sql-builder.component.html',
  styleUrls: ['./sql-builder.component.css']
})
export class SqlBuilderComponent implements OnInit {

    @Input() the_query = '';

  constructor() { }

  ngOnInit() {
  }

}
