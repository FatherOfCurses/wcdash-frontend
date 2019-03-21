import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import { MessageService } from '../../message.service';
import { ExceptionReason } from './exceptionreason.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ToptenreasonService {

  constructor(private http: HttpClient, private message: MessageService) { }

  private topTenReasonArrayUrl = 'http://localhost:8080/api/v1/topten/exceptionreason';

  getTopTenExceptionReasonArray(startDate, endDate): Observable<ExceptionReason[]> {
    const params = new HttpParams()
    .append('startDate', startDate.toString())
    .append('endDate', endDate.toString());
    this.log(params.toString());
    return this.http.get<ExceptionReason[]>(this.topTenReasonArrayUrl, {params}).pipe(
      tap(_ => this.log(`fetched array of Exception Reasons`))
    );
  }

  private log(message: string) {
    this.message.add('Top Ten Reasons Service: ' + message);
  }
}
