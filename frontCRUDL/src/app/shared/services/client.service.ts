import {Client} from '../models/client.model';
import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import {Observable, ObservedValueOf, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  apiUrl = 'http://localhost:8888';

  getClients(): Observable<ObservedValueOf<any> | unknown> {
    return this.http.get<Client >(this.apiUrl + '/clients')
      .pipe(
        map(res => res || [])
    );
  }
}
