import { Injectable } from '@angular/core';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';

export interface Envelope {
    sql: string;
    sender: string;
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

    getErrors() {
        return Observable.create(observer => {
            this.socket.fromEvent('error').subscribe(err => {
                console.error(err);
                observer.next(err);
            });
        })
    }
}
