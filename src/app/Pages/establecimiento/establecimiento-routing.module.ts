import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstablecimientoPage } from './establecimiento.page';
import { EstablecimientoEditarComponent } from './establecimiento-editar/establecimiento-editar.component';
import { EstablecimientoDetalleComponent } from './establecimiento-detalle/establecimiento-detalle.component';

const routes: Routes = [
  {
    path: '',
    component: EstablecimientoPage
  },
  {
    path: ':id/edit',
    component: EstablecimientoEditarComponent
  },
  {
    path: ':id/detalle',
    component: EstablecimientoDetalleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstablecimientoPageRoutingModule {}
