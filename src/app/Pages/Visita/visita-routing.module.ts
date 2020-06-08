import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitaPage } from './visita.page';
import { VisitaEmpresaResolverService } from 'src/app/Core/Services/Visita/visitasEmpresa-resolver';
import { VisitaDetalleComponent } from './visita-detalle/visita-detalle.component';

const routes: Routes = [
  {
    path: '',
    component: VisitaPage,
    resolve: {visitas: VisitaEmpresaResolverService}
  },
  {
    path: ':id/visita',
    component: VisitaDetalleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitaPageRoutingModule {}
