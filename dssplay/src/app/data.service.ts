import { Injectable } from '@angular/core';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';
import { DataFrame } from 'data-forge';

export interface Envelope {
    sql: string;
    sender: string;
    // result?: any;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private socket: Socket) { }

  sendSQL(envelope: Envelope){
        return Observable.create(observer => {
            this.socket.emit("sql-query", envelope);
            this.socket.fromEvent('sql-response').subscribe(data => {
                observer.next(data);
            },
            e => {
                console.error(e);
            });
        });
    }

    // readResponseAsDataFrame(envelope: Envelope) {
    //     return new DataFrame(envelope.result);
    // }

    getErrors() {
        return Observable.create(observer => {
            this.socket.fromEvent('error').subscribe(err => {
                console.error(err);
                observer.next(err);
            });
        })
    }

    getLog() {
        return Observable.create(observer => {
            this.socket.fromEvent('log').subscribe(log => {
                observer.next(log);
            });
        });
    }

    logEntry(log_entry: string) {
        this.socket.emit("log-entry", log_entry);
    }


    summarizeDataFrame(df :DataFrame, columns, aggregators :Array<Aggregators>) {
        // for each column TODO
        // // apply each of the aggregators TODO
        return df;
    }
}

export enum Aggregators {
    AVG = 'average',
    MEAN = 'mean',
    MEDIAN = 'median',
    COV = 'coefficient_of_variance',
    STD = 'standard_deviation',
    TOTAL = 'sum'
}
