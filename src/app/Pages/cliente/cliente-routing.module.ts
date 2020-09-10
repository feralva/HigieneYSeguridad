import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientePage } from './cliente.page';
import { ClienteResolver } from 'src/app/Core/Services/Cliente/cliente-resolver.service';
import { ClienteDetalleResolver } from 'src/app/Core/Services/Cliente/clienteDetalle-resolver.service';
import { ClienteDetalleComponent } from './cliente-detalle/cliente-detalle.component';
import { AltaClienteComponent } from './alta-cliente/alta-cliente.component';
import { ClientePlanesComponent } from './cliente-planes/cliente-planes.component';
import { ClientePlanesResolver } from 'src/app/Core/Services/Cliente/clientePlanes-resolver.service';
import { ClienteEstablecimientosComponent } from './cliente-establecimientos/cliente-establecimientos.component';
import { ClienteEstablecimientosResolver } from 'src/app/Core/Services/Cliente/clienteEstablecimiento-resolver.service';
import { EstablecimientoAltaComponent } from './establecimiento-alta/establecimiento-alta.component';
import { AltaPlanComponent } from '../plan/alta-plan/alta-plan.component';
import { PlanAltaTiposPlanResolverService } from 'src/app/Core/Services/Plan/planAltaTiposPlan-resolver.service';
import { ClienteEspecificoResolver } from 'src/app/Core/Services/Cliente/clienteEspecifico-resolver.service';
import { EmpresaClienteResumenResolver } from 'src/app/Core/Services/Empresa/empresaClientesResumen-resolver.service';
import { PlanEstadosPosiblesResolver } from 'src/app/Core/Services/Plan/planEstadosPosibles-resolver.service';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { ClientePropioGuard } from 'src/app/Core/Guards/Cliente/cliente-propio.guard';

const routes: Routes = [
  {
    path: '',
    component: ClientePage,
    resolve: {clientes: EmpresaClienteResumenResolver}
  },
  {
    path: ':id/detalle',
    component: ClienteDetalleComponent,
    resolve: {cliente: ClienteDetalleResolver},
    canActivate: [ ClientePropioGuard ] 
  },
  {
    path: ':id/editar',
    component: EditarClienteComponent,
    resolve: {cliente: ClienteDetalleResolver},
    canActivate: [ ClientePropioGuard ] 
  },
  {
    path: ':id/establecimiento/alta',
    component: EstablecimientoAltaComponent,
    canActivate: [ ClientePropioGuard ] /* ,
    resolve: {provincias: ClienteDetalleResolver} */
  },
  {
    path: ':id/planes',
    component: ClientePlanesComponent,
    resolve: {
      planes: ClientePlanesResolver,
      estadosPlanesPosibles: PlanEstadosPosiblesResolver,
    },
    canActivate: [ ClientePropioGuard ]
  },
  {
    path: ':id/planes/alta',
    component: AltaPlanComponent,
    resolve: {
      cliente: ClienteEspecificoResolver,
      tiposPlan: PlanAltaTiposPlanResolverService
    },
    canActivate: [ ClientePropioGuard ] 
  },
  {
    path: ':id/establecimientos',
    component: ClienteEstablecimientosComponent,
    resolve: {establecimientos: ClienteEstablecimientosResolver},
    canActivate: [ ClientePropioGuard ] 
  },
  {
    path: 'alta',
    component: AltaClienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientePageRoutingModule {}
