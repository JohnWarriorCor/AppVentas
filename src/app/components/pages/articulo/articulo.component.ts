import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ArticuloService } from '../../../services/articulo.service';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ArticuloComponent implements OnInit {
  page = 0;
  pageSize = 10;
  articulos: any[] = [];
  loading = true;
  // tslint:disable-next-line:max-line-length
  constructor(private _ARTICULOSERVICES: ArticuloService, private router: Router, private activatedRoute: ActivatedRoute) {
    this._ARTICULOSERVICES.getArticulos().subscribe( data => {
      setTimeout(() => {
        this.loading = false;
        this.articulos = data;
      }, 0);
    });
  }
  ngOnInit() {
  }
  borrarArticulo( key$: string) {
    this._ARTICULOSERVICES.borrarArticulo(key$).subscribe( respuesta => {
      if ( respuesta ) {
        console.error(respuesta);
      } else {
        delete this.articulos[key$];
        window.location.reload();
      }
    });
  }

}
