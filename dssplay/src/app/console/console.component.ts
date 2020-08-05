import { Component, OnInit, Input,AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { LogEntry } from '../app.component';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {

    @Input() log_entries: Array<LogEntry> = [];

    @ViewChild('console', {static: false}) scrollContainer: ElementRef;

  constructor() { }

  ngOnInit() {
          this.scrollToBottom();
      }

      ngAfterViewChecked() {
          this.scrollToBottom();
      }

      scrollToBottom(): void {
          try {
              this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
          } catch(err) { }
      }
}
