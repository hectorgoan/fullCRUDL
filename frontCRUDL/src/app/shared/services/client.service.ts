import {Client} from '../models/client.model';
import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  apiUrl = 'assets/dummy.json';

  getClients() {
    return this.http.get(this.apiUrl);
  }
}
