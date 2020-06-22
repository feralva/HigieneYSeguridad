import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpleadoPage } from './empleado.page';
import { EmpleadoEdicionComponent } from './empleado-edicion/empleado-edicion.component';
import { AltaEmpleadoComponent } from './alta-empleado/alta-empleado.component';
import { EmpleadoDetalleResolverService } from 'src/app/Core/Services/Empleado/empleadoDetalle-resolver.service';
import { RolesDisponiblesResolverService } from 'src/app/Core/Services/Rol/rolesDisponibles-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: EmpleadoPage
  },
  {
    path: ':id/editar',
    component: EmpleadoEdicionComponent,
    resolve: 
    {
      empleado: EmpleadoDetalleResolverService,
      roles: RolesDisponiblesResolverService
    }  
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
