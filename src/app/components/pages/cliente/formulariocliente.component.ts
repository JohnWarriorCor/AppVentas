import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, NgForm, FormControl, Validators, FormArray } from '@angular/forms';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../interfaces/cliente';
import { KeysPipe } from '../../../pipes/keys.pipe';

@Component({
  selector: 'app-formulariocliente',
  templateUrl: './formulariocliente.component.html',
  styleUrls: ['./formulariocliente.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FormularioclienteComponent implements OnInit {

  key: any;
  error = false;
  forma: FormGroup;
  controls: any;
  nuevo = false;
  id: string;
  clientes: Cliente = {
    nombre: '',
    cc: '',
    apellidos: '',
    email: '',
    direccion: '',
    celular: '',
  };
  // FECHA
  formato = 1000 * 60 * 60 * 24;
  today = new Date();
  jstoday = '';
  // tslint:disable-next-line:max-line-length
  constructor(private _CLIENTESERVICES: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.jstoday = '' + this.today;
    this.activatedRoute.params.subscribe( parametros => {
      console.log(this.jstoday);
      this.id = parametros.id;
      if ( this.id !== 'nuevo' ) {
        console.log('2');
        this._CLIENTESERVICES.getCliente( this.id ).subscribe(clientes => this.clientes = clientes);
      }
    });
  }

  ngOnInit() {
  }
  guardar() {
    if ( this.id === 'nuevo' ) {
      this._CLIENTESERVICES.nuevoCliente(this.clientes ).subscribe(data => {
        this.router.navigate(['/home']);
      },
      error => console.error(error));
    } else {
      this._CLIENTESERVICES.actualizarCliente( this.clientes, this.id ).subscribe(data => {
        this.router.navigate(['/cliente']);
      },
      error => console.error(error));
    }
  }
  agregarNuevo( forma: NgForm) {
    this.router.navigate(['/formcliente', 'nuevo']);
    forma.reset({});
  }

}
