import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientePage } from './cliente.page';
import { ClienteResolver } from 'src/app/Core/Services/Cliente/cliente-resolver.service';
import { ClienteDetalleResolver } from 'src/app/Core/Services/Cliente/clienteDetalle-resolver.service';
import { ClienteDetalleComponent } from './cliente-detalle/cliente-detalle.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientePageRoutingModule {}
