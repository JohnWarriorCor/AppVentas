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
  selector: 'app-formulariofactura',
  templateUrl: './formulariofactura.component.html',
  styleUrls: ['./formulariofactura.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FormulariofacturaComponent implements OnInit {
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
      this.clientes = data;
      this.obj1 = JSON.stringify(this.clientes);
      // console.log(this.obj);
      // console.log(typeof this.obj);
      this.myObject1 = JSON.parse(this.obj1);
      return this.myObject1;
    });
    this._ARTICULOSERVICES.getArticulos().subscribe( data => {
      this.articulos = data;
      this.obj = JSON.stringify(this.articulos);
      // console.log(this.obj);
      // console.log(typeof this.obj);
      this.myObject = JSON.parse(this.obj);
      return this.myObject;
      // tslint:disable-next-line:no-string-literal
      // console.log(this.myObject[this.llave]['nombre']);
    });
  }
  guardarKeyArticulo() {
    this.llaveArticulo = this.llaveArticulo;
    console.log(this.llaveArticulo);
    this.facturas.articulo = this.myObject[this.llaveArticulo].nombre;
    this.facturas.nombreArt = this.myObject[this.llaveArticulo].nit;
    return this.llaveArticulo;
  }
  guardarKeyCliente() {
    this.llaveCliente = this.llaveCliente;
    console.log(this.llaveCliente);
    this.facturas.apellidoCli = this.myObject1[this.llaveCliente].apellidos;
    this.facturas.idCli = this.myObject1[this.llaveCliente].cc;
    return this.llaveCliente;
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
    this.costo = +this.myObject[this.llaveArticulo].valor;
    this.facturas.valorArt = this.costo;
    this.costo = this.cantidad * this.costo;
    this.facturas.valor = this.costo;
    console.log(this.facturas.valor);
    console.log(this.facturas.valor);
    return this.facturas.valor;
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
