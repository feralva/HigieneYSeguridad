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
import { MedicionesAltaModalComponent } from './mediciones-alta-modal/mediciones-alta-modal.component';
import { MedicionesControlResolverService } from 'src/app/Core/Services/Mediciones/medicionesControl-resolver.service';
import { UbicacionesEstablecimientoResolverService } from 'src/app/Core/Services/Ubicacion/ubicacionesEstablecimiento-resolver.service';
import { AltaControlComponent } from './alta-control/alta-control.component';


const routes: Routes = [
  {
    path: '',
    component: VisitaPage,
    resolve: {visitas: VisitaEmpresaResolverService}
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
    path: ':id/controles/:idEstablecimiento/alta',
    component: AltaControlComponent,
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
