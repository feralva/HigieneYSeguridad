import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitaPageRoutingModule } from './visita-routing.module';

import { VisitaPage } from './visita.page';
import { AltaVisitaComponent } from './alta-visita/alta-visita.component';
import { VisitaDetalleComponent } from './visita-detalle/visita-detalle.component';
import { VisitaPendienteEmpleadoComponent } from './visita-pendiente-empleado/visita-pendiente-empleado.component';
import { AltaVisitaModalComponent } from './alta-visita-modal/alta-visita-modal.component';
import { VisitaEditarComponent } from './visita-editar/visita-editar.component';
import { MedicionesAltaModalComponent } from './mediciones-alta-modal/mediciones-alta-modal.component';
import { MedicionesComponent } from './mediciones/mediciones.component';
import { AltaControlComponent } from './alta-control/alta-control.component';
import { SharedDirectivesModule } from 'src/app/Core/Directives/shared-directives.module';
import { CambiarAuditorModalComponent } from './cambiar-auditor-modal/cambiar-auditor-modal.component';
import { CambiarFechaModalComponent } from './cambiar-fecha-modal/cambiar-fecha-modal.component';
import { NgCalendarModule  } from 'ionic2-calendar';

/* import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
registerLocaleData(localeDe); */

@NgModule({
  entryComponents: [AltaVisitaModalComponent, CambiarAuditorModalComponent, CambiarFechaModalComponent ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitaPageRoutingModule,
    SharedDirectivesModule,
    NgCalendarModule
  ],
  declarations: [VisitaPage, AltaVisitaComponent, VisitaDetalleComponent, 
    VisitaPendienteEmpleadoComponent, AltaVisitaModalComponent, VisitaEditarComponent, 
    MedicionesAltaModalComponent, MedicionesComponent, AltaControlComponent,
    CambiarAuditorModalComponent, CambiarFechaModalComponent]/* ,
    providers: [
      { provide: LOCALE_ID, useValue: 'de-DE' }
    ]*/, 
  exports: [ AltaVisitaModalComponent ]
})
export class VisitaPageModule {}
