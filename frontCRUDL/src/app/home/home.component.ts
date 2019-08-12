import {Component, OnInit, TemplateRef} from '@angular/core';
import { ClientService } from '../shared/services/client.service';
import { Client } from '../shared/models/client.model';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private clientService: ClientService,
    private router: Router,
    private modalService: BsModalService
  ) {}

  public loading = true;

  public showAlert = false;

  modalRef: BsModalRef;
  title = 'frontCRUDL';
  clients: Client[];

  client = new Client('', '');
  clientOnAction = null;
  clientOnActionID = null;

  emailPattern = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';

  ngOnInit() {
    this.clientService.getClients()
      .pipe(map((data: Client[]) => this.clients = data))
      .toPromise()
    .then(x => this.loading = false);
  }

  addClient() {
    this.loading = true;
    this.clientService.addClient(this.client)
      .subscribe(
        res => {
          this.loading = false;
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
            this.router.navigate(['/home']));
        },
        err => {
          this.showAlert = true;
        }
      );
  }

  removeClient(client: Client) {
    this.loading = true;
    const submitClient = new Client(client.name, client.email);
    this.clientService.removeClient(submitClient)
      .subscribe(
        res => {
          this.loading = false;
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
            this.router.navigate(['/home']));
        },
        err => {
          this.showAlert = true;
        }
      );
  }

  editClient(client: Client, clientID: number) {
    this.loading = true;
    const submitClient = new Client(client.name, client.email);
    this.clientService.editClient(submitClient, clientID)
      .subscribe(
        res => {
          this.loading = false;
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
            this.router.navigate(['/home']));
        },
        err => {
          this.showAlert = true;
        }
      );
  }

  openEditModal(template: TemplateRef<any>, client: Client, clientID: number) {
    this.clientOnAction = client;
    this.clientOnActionID = clientID;
    this.modalRef = this.modalService.show(template);
  }

  openRemoveModal(template: TemplateRef<any>, client: Client) {
    this.clientOnAction = client;
    this.modalRef = this.modalService.show(template);
  }
}
