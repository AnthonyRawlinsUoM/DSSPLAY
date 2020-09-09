import { Component, OnInit, Input } from '@angular/core';
import { DfSummaryConsumerDirective } from '../df-summary-consumer.directive';

@Component({
    selector: 'app-statview',
    templateUrl: './statview.component.html',
    styleUrls: ['./statview.component.css']
})
export class StatviewComponent implements OnInit {

    @Input() value;
    @Input() label;

    @Input() borderColor;

    @Input() isDimmed;
    @Input() message = "Loading...";

    public isClickable = true;

    getDimness() {
        return this.isDimmed;
    }

    constructor() {}

    ngOnInit() {
    }

}
