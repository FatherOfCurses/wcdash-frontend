import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import { MessageService } from '../../message.service';
import { Customer } from './customer.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class ToptencustService {

  constructor(private http: HttpClient, private message: MessageService) { }

  private topTenCustArrayUrl = 'http://localhost:8080/api/v1/topten/customer';

  getTopTenCustArray(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.topTenCustArrayUrl).pipe(
      tap(_ => this.log(`fetched array of Customers`))
    );
  }

  private log(message: string) {
    this.message.add('CompleteTransService: ' + message);
  }
}
