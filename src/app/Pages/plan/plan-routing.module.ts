import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanPage } from './plan.page';
import { DetallePlanComponent } from './detalle-plan/detalle-plan.component';
import { PlanDetalleResolverService } from 'src/app/Core/Services/Plan/plan-detalle-resolver.service';
import { PlanesEmpresaResolverService } from 'src/app/Core/Services/Plan/planes-Empresa-resolver.service';
import { AltaPlanComponent } from './alta-plan/alta-plan.component';
import { PlanAltaClienteResolverService } from 'src/app/Core/Services/Plan/planAltaCliente-resolver.service';
import { PlanAltaTiposPlanResolverService } from 'src/app/Core/Services/Plan/planAltaTiposPlan-resolver.service';
import { AltaVisitaPlanComponent } from './alta-visita-plan/alta-visita-plan.component';
import { ClienteEstablecimientosResolver } from 'src/app/Core/Services/Cliente/clienteEstablecimiento-resolver.service';
import { VisitaTiposVisitaResolverService } from 'src/app/Core/Services/Visita/visitaTiposVisita-resolver.service';
import { PlanEstadosPosiblesResolver } from 'src/app/Core/Services/Plan/planEstadosPosibles-resolver.service';
import { PlanDeClientePropioGuard } from 'src/app/Core/Guards/Plan/plan-de-cliente-propio.guard';

const routes: Routes = [
  {
    path: '',
    component: PlanPage,
    resolve: {
      planes: PlanesEmpresaResolverService,
      estadosPlanesPosibles: PlanEstadosPosiblesResolver
    }
  },
  {
    path: ':id/detalle',
    component: DetallePlanComponent,
    resolve: {plan: PlanDetalleResolverService},
    canActivate: [PlanDeClientePropioGuard]
  },
  {
    path: ':id/visita/alta',
    component: AltaVisitaPlanComponent,
    resolve: {tiposVisita: VisitaTiposVisitaResolverService},
    canActivate: [PlanDeClientePropioGuard]
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
