import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstablecimientoPage } from './establecimiento.page';

const routes: Routes = [
  {
    path: '',
    component: EstablecimientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstablecimientoPageRoutingModule {}
