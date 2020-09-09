import { Directive, Input } from '@angular/core';
import { DataFrameConsumer } from './data-frame-consumer';
import { ColorShifter } from './color-shifter';
import { DataFrame } from 'data-forge';

@Directive({
  selector: '[df-summary-consumer]'
})
export class DfSummaryConsumerDirective extends ColorShifter implements DataFrameConsumer {
    @Input()
    public dataframe: DataFrame;

    public isDimmed = true;
    public isClickable = true;
    public message = "Loading...";



    public invalidate(message:string) {
        this.message = message;
        this.isDimmed = true;
    }

    public validate(message: string) {
        this.message = message;
        this.isDimmed = false;
        console.log(this);
        console.log('This DF Summary Consumer is validating now.');
    }

    getDimness() {
        return this.isDimmed;
    }

    constructor() { super(); }

    onDataframeChange(df:DataFrame) {
        this.validate('Self-validating because why not?');
    }
}
