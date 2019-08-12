import { Component, OnInit } from '@angular/core';
import { ClientService } from '../shared/services/client.service';
import { Client } from '../shared/models/client.model';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private clientService: ClientService) {}

  title = 'frontCRUDL';
  clients: Client[];

  ngOnInit() {
    this.clientService.getClients()
      .pipe(map((data: Client[]) => this.clients = data))
      .toPromise()
    .then(x => console.log(this.clients));
  }

}
