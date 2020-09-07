import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';
import { EmpresaDatosGraficoVisitasPorEstadoResolver } from 'src/app/Core/Services/Empresa/empresaDatosGraficoVisitasPorEstado-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    resolve: {
      totalizados: EmpresaDatosGraficoVisitasPorEstadoResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
