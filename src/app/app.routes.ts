import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './components/pages/cliente/cliente.component';
import { ArticuloComponent } from './components/pages/articulo/articulo.component';
import { FacturaComponent } from './components/pages/factura/factura.component';
import { FormularioarticuloComponent } from './components/pages/articulo/formularioarticulo.component';
import { FormularioclienteComponent } from './components/pages/cliente/formulariocliente.component';
import { FormulariofacturaComponent } from './components/pages/factura/formulariofactura.component';
import { UpdateFacturaComponent } from './components/pages/factura/update-factura.component';
const routes: Routes = [
    { path: 'cliente', component: ClienteComponent },
    { path: 'articulo', component: ArticuloComponent },
    { path: 'factura', component: FacturaComponent },
    { path: 'formcliente/:id', component: FormularioclienteComponent },
    { path: 'formarticulo/:id', component: FormularioarticuloComponent },
    { path: 'formfactura/:id', component: FormulariofacturaComponent },
    { path: 'updateformfactura/:id', component: UpdateFacturaComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'cliente' }
];

export const APP_ROUTING = RouterModule.forRoot(routes, {useHash: true});
