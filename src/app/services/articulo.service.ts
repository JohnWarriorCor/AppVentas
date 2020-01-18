import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import { map } from 'rxjs/operators';
import { Articulo } from '../interfaces/articulo';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  condicionRegistroURL = 'https://appventas-b5b5f.firebaseio.com/articulos.json';
  condicionURL = 'https://appventas-b5b5f.firebaseio.com/articulos/';
  constructor( private http: Http) { }

  nuevoArticulo( regis: Articulo) {
    const body = JSON.stringify(regis);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post( this.condicionRegistroURL, body, {headers} ).pipe(map(res => {
      console.log(res.json());
      return res.json();
    }));
  }
  actualizarArticulo( reg: Articulo, key$: string ) {
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
  getArticulo(key$: string) {
    const url = `${ this.condicionURL }/${ key$ }.json`;
    return this.http.get( url ).pipe(map(res => res.json()));
  }
  getArticulos() {
    return this.http.get( this.condicionRegistroURL ).pipe(map(res => res.json()));
  }
  borrarArticulo( key$: string) {
    const url = `${ this.condicionURL }/${ key$ }.json`;
    return this.http.delete(url).pipe(map( res => res.json()));
  }
}
