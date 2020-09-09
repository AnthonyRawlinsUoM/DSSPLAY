import { Directive, Input } from '@angular/core';
import { DataFrameConsumer } from './data-frame-consumer';
import { ColorShifter } from './color-shifter';
import { DataFrame } from 'data-forge';

@Directive({
  selector: '[df-consumer]'
})
export class DfConsumerDirective extends ColorShifter implements DataFrameConsumer {
    @Input()
    public dataframe: DataFrame;

    public isDimmed = true;
    public isClickable = true;
    public message = "Loading...";

    constructor() { super(); }

    public invalidate(message:string) {
        this.message = message;
        this.isDimmed = true;
    }

    public validate(message: string) {
        this.message = message;
        this.isDimmed = false;
        console.log(this);
        console.log('This DF Consumer is validating now.');
    }

    getDimness() {
        return this.isDimmed;
    }

    onDataframeChange(df:DataFrame) {
        this.validate('Self-validating because why not?');
    }

}
