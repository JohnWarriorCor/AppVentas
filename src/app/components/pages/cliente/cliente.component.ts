import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ClienteComponent implements OnInit {
  page = 0;
  pageSize = 10;
  clientes: any[] = [];
  loading = true;
  // tslint:disable-next-line:max-line-length
  constructor(private _CLIENTESERVICES: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) {
    this._CLIENTESERVICES.getClientes().subscribe( data => {
      setTimeout(() => {
        this.loading = false;
        this.clientes = data;
      }, 0);
    });
  }
  ngOnInit() {
  }
  borrarCliente( key$: string) {
    this._CLIENTESERVICES.borrarCliente(key$).subscribe( respuesta => {
      if ( respuesta ) {
        console.error(respuesta);
      } else {
        delete this.clientes[key$];
        window.location.reload();
      }
    });
  }
}
