import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquiposMedicionPage } from './equipos-medicion.page';
import { AltaEquipoMedicionComponent } from '../alta-equipo-medicion/alta-equipo-medicion.component';

const routes: Routes = [
  {
    path: '',
    component: EquiposMedicionPage
  },
  {
    path: 'alta',
    component: AltaEquipoMedicionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquiposMedicionPageRoutingModule {}
