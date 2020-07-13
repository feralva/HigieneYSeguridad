import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstablecimientoPage } from './establecimiento.page';
import { EstablecimientoEditarComponent } from './establecimiento-editar/establecimiento-editar.component';
import { EstablecimientoDetalleComponent } from './establecimiento-detalle/establecimiento-detalle.component';
import { EstablecimientoDetalleResolverService } from 'src/app/Core/Services/Establecimiento/establecimientoDetalle-resolver.service';

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
    }  
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
