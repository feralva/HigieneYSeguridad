import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquiposMedicionPage } from './equipos-medicion.page';

const routes: Routes = [
  {
    path: '',
    component: EquiposMedicionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquiposMedicionPageRoutingModule {}
