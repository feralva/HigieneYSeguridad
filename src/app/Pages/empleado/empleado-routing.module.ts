import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpleadoPage } from './empleado.page';
import { EmpleadoEdicionComponent } from './empleado-edicion/empleado-edicion.component';
import { AltaEmpleadoComponent } from './alta-empleado/alta-empleado.component';

const routes: Routes = [
  {
    path: '',
    component: EmpleadoPage
  },
  {
    path: ':id/edit',
    component: EmpleadoEdicionComponent
  },
  {
    path: 'alta',
    component: AltaEmpleadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpleadoPageRoutingModule {}
