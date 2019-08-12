import { Component, OnInit } from '@angular/core';
import { ClientService } from '../shared/services/client.service';
import { Client } from '../shared/models/client.model';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private clientService: ClientService, private router: Router) {}

  title = 'frontCRUDL';
  clients: Client[];

  client = new Client('', '');

  emailPattern = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';

  ngOnInit() {
    this.clientService.getClients()
      .pipe(map((data: Client[]) => this.clients = data))
      .toPromise()
    .then(x => console.log(this.clients));
  }

  addClient() {
    this.clientService.addClient(this.client)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
            this.router.navigate(['/home']));
        },
        err => {
          console.log('Error occured');
        }
      );
  }

  removeClient(client: Client) {
    const submitClient = new Client(client.name, client.email);
    this.clientService.removeClient(submitClient)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
            this.router.navigate(['/home']));
        },
        err => {
          console.log('Error occured');
        }
      );
  }
}
