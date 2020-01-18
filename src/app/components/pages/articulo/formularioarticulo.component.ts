import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ArticuloService } from '../../../services/articulo.service';
import { Articulo } from '../../../interfaces/articulo';
import { formatDate } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, NgForm, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-formularioarticulo',
  templateUrl: './formularioarticulo.component.html',
  styleUrls: ['./formularioarticulo.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FormularioarticuloComponent implements OnInit {

  key: any;
  error = false;
  forma: FormGroup;
  controls: any;
  nuevo = false;
  id: string;
  articulos: Articulo = {
    nombre: '',
    nit: '',
    valor: '',
    carac: '',
  };
  // FECHA
  formato = 1000 * 60 * 60 * 24;
  today = new Date();
  jstoday = '';
  // tslint:disable-next-line:max-line-length
  constructor(private _ARTIUCULOSERVICES: ArticuloService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.jstoday = '' + this.today;
    this.activatedRoute.params.subscribe( parametros => {
      console.log(this.jstoday);
      this.id = parametros.id;
      if ( this.id !== 'nuevo' ) {
        this._ARTIUCULOSERVICES.getArticulo( this.id ).subscribe(articulos => this.articulos = articulos);
      }
    });
  }

  ngOnInit() {
  }
  guardar() {
    if ( this.id === 'nuevo' ) {
      this._ARTIUCULOSERVICES.nuevoArticulo(this.articulos ).subscribe(data => {
        this.router.navigate(['/articulo']);
      },
      error => console.error(error));
    } else {
      this._ARTIUCULOSERVICES.actualizarArticulo( this.articulos, this.id ).subscribe(data => {
        this.router.navigate(['/articulo']);
      },
      error => console.error(error));
    }
  }
  agregarNuevo( forma: NgForm) {
    this.router.navigate(['/formarticulo', 'nuevo']);
    forma.reset({});
  }


}
