import { Directive } from '@angular/core';
import { DataFrameConsumer } from './data-frame-consumer';
@Directive({
  selector: '[df-consumer]'
})
export class DfConsumerDirective implements DataFrameConsumer {

    public isDimmed = false;
    isClickable = false;
    message = "Loading...";

    constructor() { }

    public invalidate(message:string) {
        this.message = message;
        this.isDimmed = true;
    }

    public validate(message: string) {
        this.message = message;
        this.isDimmed = false;
    }

}
