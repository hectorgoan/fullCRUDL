import {Client} from '../models/client.model';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

  addClient(client: Client): Observable<ObservedValueOf<any> | unknown> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      })
    };
    return this.http.post<Client>(this.apiUrl + '/client', client, httpOptions);
  }

  removeClient(client: Client): Observable<ObservedValueOf<any> | unknown> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      }),
      body: client
    };
    return this.http.delete<Client>(this.apiUrl + '/client', httpOptions);
  }
}
