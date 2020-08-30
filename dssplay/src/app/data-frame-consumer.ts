export interface DataFrameConsumer {
    message:string;
    isDimmed: boolean;
    isClickable:boolean;

    invalidate(message:string):void;
    validate(message:string):void;
}
