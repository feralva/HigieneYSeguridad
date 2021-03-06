import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpleadoPage } from './empleado.page';
import { EmpleadoEdicionComponent } from './empleado-edicion/empleado-edicion.component';
import { AltaEmpleadoComponent } from './alta-empleado/alta-empleado.component';
import { EmpleadoDetalleResolverService } from 'src/app/Core/Services/Empleado/empleadoDetalle-resolver.service';
import { RolesDisponiblesResolverService } from 'src/app/Core/Services/Rol/rolesDisponibles-resolver.service';
import { EmpleadoDeEmpresaGuard } from 'src/app/Core/Guards/Empleado/empleado-de-empresa.guard';
import { EmpleadoDetalleComponent } from './empleado-detalle/empleado-detalle.component';

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
    },
    canActivate: [EmpleadoDeEmpresaGuard]  
  },
  {
    path: ':id/detalle',
    component: EmpleadoDetalleComponent,
    resolve: 
    {
      empleado: EmpleadoDetalleResolverService
    },
    canActivate: [EmpleadoDeEmpresaGuard]  
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
