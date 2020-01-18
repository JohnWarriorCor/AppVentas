import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FacturaService } from '../../../services/factura.service';
import { Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FacturaComponent implements OnInit {

  page = 0;
  pageSize = 10;
  facturas: any[] = [];
  loading = true;
  // tslint:disable-next-line:max-line-length
  constructor(private _FACTURASERVICES: FacturaService, private router: Router, private activatedRoute: ActivatedRoute) {
    this._FACTURASERVICES.getFacturas().subscribe( data => {
      setTimeout(() => {
        this.loading = false;
        this.facturas = data;
      }, 0);
    });
  }
  ngOnInit() {
  }
  borrarFactura( key$: string) {
    this._FACTURASERVICES.borrarFactura(key$).subscribe( respuesta => {
      if ( respuesta ) {
        console.error(respuesta);
      } else {
        delete this.facturas[key$];
        window.location.reload();
      }
    });
  }

}
