import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquiposMedicionPage } from './equipos-medicion.page';
import { AltaEquipoMedicionComponent } from '../alta-equipo-medicion/alta-equipo-medicion.component';
import { ModificarCantidadEquiposMedicionComponent } from '../modificar-cantidad-equipos-medicion/modificar-cantidad-equipos-medicion.component';
import { TipoEquipoMedicionDetalleResolver } from 'src/app/Core/Services/EquipoMedicion/tipoEquipoMedicionDetalle-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: EquiposMedicionPage
  },
  {
    path: 'alta',
    component: AltaEquipoMedicionComponent
  },
  {
    path: 'tipo/:nombre/editar',
    component: ModificarCantidadEquiposMedicionComponent,
    resolve: 
    {
      tipoEquipoMedicion: TipoEquipoMedicionDetalleResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquiposMedicionPageRoutingModule {}
