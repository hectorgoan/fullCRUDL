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
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    })
  };

  getClients(): Observable<ObservedValueOf<any> | unknown> {
    return this.http.get<Client >(this.apiUrl + '/clients')
      .pipe(
        map(res => res || [])
    );
  }

  addClient(client: Client): Observable<ObservedValueOf<any> | unknown> {
    return this.http.post<Client>(this.apiUrl + '/client', client, this.httpOptions);
  }
}
