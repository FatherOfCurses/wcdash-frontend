import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import { CompleteTrans } from './count-function/transactioncount/completetrans.model';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CompleteTransService {

  constructor(private http: HttpClient, private message: MessageService) { }

  private baseUrl = 'https://wcdashdatasource-development.us-east-1.np.paas.lmig.com/';
  private completeArrayUrl = 'api/v1/complete/summary';

  getCompleteTransArray(startDate, endDate): Observable<CompleteTrans[]> {
    const params = new HttpParams()
    .append('startDate', startDate.toString())
    .append('endDate', endDate.toString());
    return this.http.get<CompleteTrans[]>(this.baseUrl + this.completeArrayUrl, {params}).pipe(
      tap(_ => this.log('fetched array of transactions'))
    );
  }

  private log(message: string) {
    this.message.console('CompleteTransService: ' + message);
  }
}
