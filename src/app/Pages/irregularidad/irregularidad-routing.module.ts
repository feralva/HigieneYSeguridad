import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IrregularidadPage } from './irregularidad.page';

const routes: Routes = [
  {
    path: '',
    component: IrregularidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IrregularidadPageRoutingModule {}
