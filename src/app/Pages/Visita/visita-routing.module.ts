import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitaPage } from './visita.page';
import { VisitaEmpresaResolverService } from 'src/app/Core/Services/Visita/visitasEmpresa-resolver';
import { VisitaDetalleComponent } from './visita-detalle/visita-detalle.component';
import { VisitaEditarComponent } from './visita-editar/visita-editar.component';
import { VisitaPendienteEmpleadoComponent } from './visita-pendiente-empleado/visita-pendiente-empleado.component';
import { VisitaPendienteResolverService } from 'src/app/Core/Services/Visita/visitaPendiente-resolver.service';


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
  },
  {
    path: 'Pendientes',
    component: VisitaPendienteEmpleadoComponent,
    resolve: {visitas: VisitaPendienteResolverService}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitaPageRoutingModule {}
