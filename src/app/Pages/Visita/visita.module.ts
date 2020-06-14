import { NgModule } from '@angular/core';
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

@NgModule({
  entryComponents: [AltaVisitaModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitaPageRoutingModule
  ],
  declarations: [VisitaPage, AltaVisitaComponent, VisitaDetalleComponent, 
    VisitaPendienteEmpleadoComponent, AltaVisitaModalComponent, VisitaEditarComponent],
  exports: [ AltaVisitaModalComponent ]
})
export class VisitaPageModule {}
