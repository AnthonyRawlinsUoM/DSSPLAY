import { Component, OnInit, Input } from '@angular/core';

export interface Message {
  message: string;
  class: string;
  closable: boolean;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  @Input() messages:Array<Message>;
  
  constructor() { }

  ngOnInit(): void {
  }

}
