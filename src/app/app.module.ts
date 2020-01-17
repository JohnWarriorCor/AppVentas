import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClienteComponent } from './components/pages/cliente/cliente.component';
import { FacturaComponent } from './components/pages/factura/factura.component';
import { ArticuloComponent } from './components/pages/articulo/articulo.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { APP_ROUTING } from './app.routes';
import { FormularioclienteComponent } from './components/pages/cliente/formulariocliente.component';
import { FormulariofacturaComponent } from './components/pages/factura/formulariofactura.component';
import { FormularioarticuloComponent } from './components/pages/articulo/formularioarticulo.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    FacturaComponent,
    ArticuloComponent,
    FooterComponent,
    HeaderComponent,
    FormularioclienteComponent,
    FormulariofacturaComponent,
    FormularioarticuloComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
