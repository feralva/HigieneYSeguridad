import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AltaEmpresaPage } from './alta-empresa.page';

const routes: Routes = [
  {
    path: 'alta',
    component: AltaEmpresaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AltaEmpresaPageRoutingModule {}
