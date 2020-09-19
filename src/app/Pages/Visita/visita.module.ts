import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitaPageRoutingModule } from './visita-routing.module';

import { VisitaPage } from './visita.page';
import { VisitaDetalleComponent } from './visita-detalle/visita-detalle.component';
import { VisitaPendienteEmpleadoComponent } from './visita-pendiente-empleado/visita-pendiente-empleado.component';
import { AltaVisitaModalComponent } from './alta-visita-modal/alta-visita-modal.component';
import { VisitaEditarComponent } from './visita-editar/visita-editar.component';
import { MedicionesComponent } from './mediciones/mediciones.component';
import { SharedDirectivesModule } from 'src/app/Core/Directives/shared-directives.module';
import { CambiarAuditorModalComponent } from './cambiar-auditor-modal/cambiar-auditor-modal.component';
import { CambiarFechaModalComponent } from './cambiar-fecha-modal/cambiar-fecha-modal.component';
import { NgCalendarModule  } from 'ionic2-calendar';
import { CambiarFechaDetalleModalComponent } from './cambiar-fecha-detalle-modal/cambiar-fecha-detalle-modal.component';
import { ControlCapacitacionComponent } from './Medir/control-capacitacion/control-capacitacion.component';
import { ControlPrevencionIncendioComponent } from './Medir/control-prevencion-incendio/control-prevencion-incendio.component';
import { MedicionElectricaComponent } from './Medir/medicion-electrica/medicion-electrica.component';
import { MedicionEmisionGasesComponent } from './Medir/medicion-emision-gases/medicion-emision-gases.component';
import { MedicionLuminicaComponent } from './Medir/medicion-luminica/medicion-luminica.component';
import { MedicionSonoraComponent } from './Medir/medicion-sonora/medicion-sonora.component';
import { IonicSelectableModule } from 'ionic-selectable';
import { SeleccionarUbicacionControlComponent } from './seleccionar-ubicacion-control/seleccionar-ubicacion-control.component';
import { PipesModule } from 'src/app/Core/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
/* import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
registerLocaleData(localeDe); */

@NgModule({
  entryComponents: [CambiarAuditorModalComponent, CambiarFechaModalComponent, CambiarFechaDetalleModalComponent ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitaPageRoutingModule,
    SharedDirectivesModule,
    NgCalendarModule,
    IonicSelectableModule,
    PipesModule,
    TranslateModule
  ],
  declarations: [ VisitaPage, VisitaDetalleComponent, 
    VisitaPendienteEmpleadoComponent, AltaVisitaModalComponent, VisitaEditarComponent, 
    MedicionesComponent, SeleccionarUbicacionControlComponent,
    CambiarAuditorModalComponent, CambiarFechaModalComponent, CambiarFechaDetalleModalComponent,
    ControlCapacitacionComponent, ControlPrevencionIncendioComponent, MedicionElectricaComponent,
    MedicionEmisionGasesComponent, MedicionLuminicaComponent, MedicionSonoraComponent],
  exports: [ AltaVisitaModalComponent ]
})
export class VisitaPageModule {}
