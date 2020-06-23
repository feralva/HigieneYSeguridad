import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientePage } from './cliente.page';
import { ClienteResolver } from 'src/app/Core/Services/Cliente/cliente-resolver.service';
import { ClienteDetalleResolver } from 'src/app/Core/Services/Cliente/clienteDetalle-resolver.service';
import { ClienteDetalleComponent } from './cliente-detalle/cliente-detalle.component';
import { AltaClienteComponent } from './alta-cliente/alta-cliente.component';
import { ClientePlanesComponent } from './cliente-planes/cliente-planes.component';
import { ClientePlanesResolver } from 'src/app/Core/Services/Cliente/clientePlanes-resolver.service';
import { ClienteEstablecimientosComponent } from './cliente-establecimientos/cliente-establecimientos.component';
import { ClienteEstablecimientosResolver } from 'src/app/Core/Services/Cliente/clienteEstablecimiento-resolver.service';
import { EstablecimientoAltaComponent } from './establecimiento-alta/establecimiento-alta.component';

const routes: Routes = [
  {
    path: '',
    component: ClientePage,
    resolve: {clientes: ClienteResolver}
  },
  {
    path: ':id/detalle',
    component: ClienteDetalleComponent,
    resolve: {cliente: ClienteDetalleResolver}
  },
  {
    path: ':id/establecimiento/alta',
    component: EstablecimientoAltaComponent/* ,
    resolve: {provincias: ClienteDetalleResolver} */
  },
  {
    path: ':id/planes',
    component: ClientePlanesComponent,
    resolve: {planes: ClientePlanesResolver}
  },
  {
    path: ':id/establecimientos',
    component: ClienteEstablecimientosComponent,
    resolve: {establecimientos: ClienteEstablecimientosResolver}
  },
  {
    path: 'alta',
    component: AltaClienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientePageRoutingModule {}
