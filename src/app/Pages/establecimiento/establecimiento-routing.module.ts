import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstablecimientoPage } from './establecimiento.page';
import { EstablecimientoEditarComponent } from './establecimiento-editar/establecimiento-editar.component';
import { EstablecimientoDetalleComponent } from './establecimiento-detalle/establecimiento-detalle.component';
import { EstablecimientoDetalleResolverService } from 'src/app/Core/Services/Establecimiento/establecimientoDetalle-resolver.service';
import { EstablecimientoDeClientePropioGuard } from 'src/app/Core/Guards/Establecimiento/establecimiento-de-cliente-propio.guard';

const routes: Routes = [
  {
    path: '',
    component: EstablecimientoPage
  },
  {
    path: ':id/editar',
    component: EstablecimientoEditarComponent,
    resolve: 
    {
      establecimiento: EstablecimientoDetalleResolverService
    },
    canActivate: [ EstablecimientoDeClientePropioGuard ]

  },
  {
    path: ':id/detalle',
    component: EstablecimientoDetalleComponent,
    resolve: 
    {
      establecimiento: EstablecimientoDetalleResolverService
    },
    canActivate: [ EstablecimientoDeClientePropioGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstablecimientoPageRoutingModule {}
