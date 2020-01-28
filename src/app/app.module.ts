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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { KeysPipe } from './pipes/keys.pipe';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UpdateFacturaComponent } from './components/pages/factura/update-factura.component';

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
    FormularioarticuloComponent,
    KeysPipe,
    UpdateFacturaComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    NgbModule,
    RouterModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
