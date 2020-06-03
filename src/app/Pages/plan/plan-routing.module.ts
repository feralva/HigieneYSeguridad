import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanPage } from './plan.page';
import { DetallePlanComponent } from './detalle-plan/detalle-plan.component';
import { PlanDetalleResolverService } from 'src/app/Core/Services/Plan/plan-detalle-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: PlanPage
  },
  {
    path: ':id/detalle',
    component: DetallePlanComponent,
    resolve: {plan: PlanDetalleResolverService}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanPageRoutingModule {}
