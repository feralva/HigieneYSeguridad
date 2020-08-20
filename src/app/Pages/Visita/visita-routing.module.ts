import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitaPage } from './visita.page';
import { VisitaEmpresaResolverService } from 'src/app/Core/Services/Visita/visitasEmpresa-resolver';
import { VisitaDetalleComponent } from './visita-detalle/visita-detalle.component';
import { VisitaEditarComponent } from './visita-editar/visita-editar.component';
import { VisitaPendienteEmpleadoComponent } from './visita-pendiente-empleado/visita-pendiente-empleado.component';
import { VisitaPendienteResolverService } from 'src/app/Core/Services/Visita/visitaPendiente-resolver.service';
import { ControlesVisitaResolverService } from 'src/app/Core/Services/Control/controlesVisita-Resolver.service';
import { VisitaDetalleResolverService } from 'src/app/Core/Services/Visita/visitaDetalle-resolver.service';
import { MedicionesComponent } from './mediciones/mediciones.component';
import { MedicionesControlResolverService } from 'src/app/Core/Services/Mediciones/medicionesControl-resolver.service';
import { UbicacionesEstablecimientoResolverService } from 'src/app/Core/Services/Ubicacion/ubicacionesEstablecimiento-resolver.service';
import { SeleccionarUbicacionControlComponent } from './seleccionar-ubicacion-control/seleccionar-ubicacion-control.component';
import { MedicionSonoraComponent } from './Medir/medicion-sonora/medicion-sonora.component';
import { MedicionLuminicaComponent } from './Medir/medicion-luminica/medicion-luminica.component';
import { ControlPrevencionIncendioComponent } from './Medir/control-prevencion-incendio/control-prevencion-incendio.component';
import { MedicionEmisionGasesComponent } from './Medir/medicion-emision-gases/medicion-emision-gases.component';
import { MedicionElectricaComponent } from './Medir/medicion-electrica/medicion-electrica.component';
import { ClienteResolver } from 'src/app/Core/Services/Cliente/cliente-resolver.service';
import { VisitaEstadoResolverService } from 'src/app/Core/Services/Visita/visitaEstados-resolver.service';


const routes: Routes = [
  {
    path: '',
    component: VisitaPage,
    resolve: {
      visitas: VisitaEmpresaResolverService,
      clientes: ClienteResolver,
      estados: VisitaEstadoResolverService
    }
  },
  {
    path: ':id/detalle',
    component: VisitaDetalleComponent,
    resolve: {
      controles: ControlesVisitaResolverService,
      visita: VisitaDetalleResolverService
    }
  },
/*   {
    path: ':id/detalle/ControlesRealizados',
    component: 
  }, */
  {
    path: ':id/editar',
    component: VisitaEditarComponent,
    resolve: {
      visita: VisitaDetalleResolverService
    }
  },
  {
    path: ':id/control/:idControl/mediciones',
    component: MedicionesComponent,
    resolve: {
      mediciones: MedicionesControlResolverService
    }
  },
  {
    path: ':id/controles/:idEstablecimiento/medicionSonora/alta',
    component: MedicionSonoraComponent,
    resolve: {
      ubicaciones: UbicacionesEstablecimientoResolverService
    }
  }, 
  {
    path: ':id/controles/:idEstablecimiento/medicionLuz/alta',
    component: MedicionLuminicaComponent,
    resolve: {
      ubicaciones: UbicacionesEstablecimientoResolverService
    }
  }, 
  {
    path: ':id/controles/:idEstablecimiento/medicionIncendio/alta',
    component: ControlPrevencionIncendioComponent,
    resolve: {
      ubicaciones: UbicacionesEstablecimientoResolverService
    }
  }, 
  {
    path: ':id/controles/:idEstablecimiento/medicionEmisionGases/alta',
    component: MedicionEmisionGasesComponent,
    resolve: {
      ubicaciones: UbicacionesEstablecimientoResolverService
    }
  }, 
  {
    path: ':id/controles/:idEstablecimiento/medicionElectrica/alta',
    component: MedicionElectricaComponent,
    resolve: {
      ubicaciones: UbicacionesEstablecimientoResolverService
    }
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
