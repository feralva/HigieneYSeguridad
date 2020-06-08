import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanPage } from './plan.page';
import { DetallePlanComponent } from './detalle-plan/detalle-plan.component';
import { PlanDetalleResolverService } from 'src/app/Core/Services/Plan/plan-detalle-resolver.service';
import { PlanesEmpresaResolverService } from 'src/app/Core/Services/Plan/planes-Empresa-resolver.service';
import { AltaPlanComponent } from './alta-plan/alta-plan.component';
import { PlanAltaClienteResolverService } from 'src/app/Core/Services/Plan/planAltaCliente-resolver.service';
import { PlanAltaTiposPlanResolverService } from 'src/app/Core/Services/Plan/planAltaTiposPlan-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: PlanPage,
    resolve: {planes: PlanesEmpresaResolverService}
  },
  {
    path: ':id/detalle',
    component: DetallePlanComponent,
    resolve: {plan: PlanDetalleResolverService}
  },
  {
    path: 'alta',
    component: AltaPlanComponent,
    resolve: {
      clientes: PlanAltaClienteResolverService,
      tiposPlan: PlanAltaTiposPlanResolverService,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanPageRoutingModule {}
