import { Component } from '@angular/core';
import { ClientService } from './shared/services/client.service';
import { Client } from './shared/models/client.model';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontCRUDL';
  clients = null;

  constructor(private clientService: ClientService) {}

  getClientsList() {
    this.clientService.getClients()
      .pipe(map((data: Client) => this.clients = {data}))
      .toPromise()
      .then(x => console.log(this.clients));

  }
}
