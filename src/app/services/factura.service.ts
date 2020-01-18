import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import { map } from 'rxjs/operators';
import { Factura } from '../interfaces/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  condicionRegistroURL = 'https://appventas-b5b5f.firebaseio.com/facturas.json';
  condicionURL = 'https://appventas-b5b5f.firebaseio.com/facturas/';
  constructor( private http: Http) { }

  nuevoFactura( regis: Factura) {
    const body = JSON.stringify(regis);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post( this.condicionRegistroURL, body, {headers} ).pipe(map(res => {
      console.log(res.json());
      return res.json();
    }));
  }
  actualizarFactura( reg: Factura, key$: string ) {
    const body = JSON.stringify(reg);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = `${this.condicionURL}/${key$}.json`;

    return this.http.put( url, body, {headers} ).pipe(map( res => {
      console.log(res.json());
      return res.json();
    }));

  }
  getFactura(key$: string) {
    const url = `${ this.condicionURL }/${ key$ }.json`;
    return this.http.get( url ).pipe(map(res => res.json()));
  }
  getFacturas() {
    return this.http.get( this.condicionRegistroURL ).pipe(map(res => res.json()));
  }
  borrarFactura( key$: string) {
    const url = `${ this.condicionURL }/${ key$ }.json`;
    return this.http.delete(url).pipe(map( res => res.json()));
  }
}
