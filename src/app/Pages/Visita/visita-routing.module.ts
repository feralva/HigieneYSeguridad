import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitaPage } from './visita.page';
import { VisitaEmpresaResolverService } from 'src/app/Core/Services/Visita/visitasEmpresa-resolver';
import { VisitaDetalleComponent } from './visita-detalle/visita-detalle.component';
import { VisitaEditarComponent } from './visita-editar/visita-editar.component';


const routes: Routes = [
  {
    path: '',
    component: VisitaPage,
    resolve: {visitas: VisitaEmpresaResolverService}
  },
  {
    path: ':id/detalle',
    component: VisitaDetalleComponent
  },
  {
    path: ':id/editar',
    component: VisitaEditarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitaPageRoutingModule {}
