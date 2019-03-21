import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import { ExceptionTrans } from './count-function/transactioncount/exceptiontrans.model';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ExceptionTransService {

  constructor(private http: HttpClient, private message: MessageService) { }

  private baseUrl = 'https://wcdashdatasource-development.us-east-1.np.paas.lmig.com/';
  private exceptionArrayUrl = 'api/v1/exception/summary';

  getExceptionTransArray(startDate, endDate): Observable<ExceptionTrans[]> {
    const params = new HttpParams()
    .append('startDate', startDate.toString())
    .append('endDate', endDate.toString());
    return this.http.get<ExceptionTrans[]>(this.baseUrl + this.exceptionArrayUrl, {params}).pipe(
      tap(_ => this.log(`fetched array of exception transactions`))
    );
  }

  private log(message: string) {
    this.message.console('ExceptionTransService: ' + message);
  }
}
