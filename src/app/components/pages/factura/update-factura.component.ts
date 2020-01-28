import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, NgForm, FormControl, Validators, FormArray } from '@angular/forms';
import { Factura } from '../../../interfaces/factura';
import { FacturaService } from '../../../services/factura.service';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../interfaces/cliente';
import { ArticuloService } from '../../../services/articulo.service';
import { Articulo } from '../../../interfaces/articulo';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-update-factura',
  templateUrl: './update-factura.component.html',
  styleUrls: ['./update-factura.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UpdateFacturaComponent implements OnInit {

  costo: any;
  cantidad: any;
  val: any;
  key: any;
  error = false;
  forma: FormGroup;
  controls: any;
  nuevo = false;
  id: string;
  clientes: any[] = [];
  articulos: any[] = [];
  facturas: Factura = {
    nit: '',
    fecha: '',
    articulo: '',
    valorArt: '',
    nombreArt: '',
    cantidad: '',
    apellidoCli: '',
    idCli: '',
    valor: '',
  };
  clientesJson: Cliente = {
    nombre: '',
    cc: '',
    apellidos: '',
    email: '',
    direccion: '',
    celular: '',
  };
  articulosJson: Articulo = {
    nombre: '',
    nit: '',
    valor: '',
    carac: '',
  };
  // FECHA
  formato = 1000 * 60 * 60 * 24;
  today = new Date();
  jstoday = '';
  obj: any;
  myObject: any[];
  obj1: any;
  myObject1: any[];
  llaveArticulo: any;
  llaveCliente: any;
  // tslint:disable-next-line:max-line-length
  constructor(private _FACTURASERVICES: FacturaService, private _ARTICULOSERVICES: ArticuloService, private _CLIENTESERVICES: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.jstoday = '' + this.today;
    this.activatedRoute.params.subscribe( parametros => {
      console.log(this.jstoday);
      this.id = parametros.id;
      if ( this.id !== 'nuevo' ) {
        this._FACTURASERVICES.getFactura( this.id ).subscribe(facturas => this.facturas = facturas);
      }
    });
    this._CLIENTESERVICES.getClientes().subscribe( data => {
      setTimeout(() => {
        this.clientes = data;
      }, 0);
    });
    this._ARTICULOSERVICES.getArticulos().subscribe( data => {
      setTimeout(() => {
        this.articulos = data;
      }, 0);
    });
  }

  ngOnInit() {
  }
  guardar() {
    if ( this.id === 'nuevo' ) {
      this._FACTURASERVICES.nuevoFactura(this.facturas ).subscribe(data => {
        this.router.navigate(['/factura']);
      },
      error => console.error(error));
    } else {
      this._FACTURASERVICES.actualizarFactura( this.facturas, this.id ).subscribe(data => {
        this.router.navigate(['/factura']);
      },
      error => console.error(error));
    }
  }
  precio() {
    this.cantidad = +this.facturas.cantidad;
    // this.val = +this.articulos.valor;
    this.costo = this.cantidad * 1000;
    this.facturas.valor = this.costo;
    console.log(this.facturas.valor);
    return ('' + this.facturas.valor);
  }
  cargarArticulo() {
    console.log('Paso ', this.articulos[0].nombre);
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < this.articulos.length; index++) {
      if (this.facturas.articulo === this.articulos[index].nit) {
        console.log('Ture');
      } else {
        console.log('False');
      }
    }
  }
  agregarNuevo( forma: NgForm) {
    this.router.navigate(['/formfactura', 'nuevo']);
    forma.reset({});
  }


}
