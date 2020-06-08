import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitaPage } from './visita.page';
import { VisitaEmpresaResolverService } from 'src/app/Core/Services/Visita/visitasEmpresa-resolver';

const routes: Routes = [
  {
    path: '',
    component: VisitaPage,
    resolve: {visitas: VisitaEmpresaResolverService}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitaPageRoutingModule {}
