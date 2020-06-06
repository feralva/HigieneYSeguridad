import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitaPageRoutingModule } from './visita-routing.module';

import { VisitaPage } from './visita.page';
import { AltaVisitaComponent } from './alta-visita/alta-visita.component';
import { VisitaDetalleComponent } from './visita-detalle/visita-detalle.component';
import { VisitaPendienteEmpleadoComponent } from './visita-pendiente-empleado/visita-pendiente-empleado.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitaPageRoutingModule
  ],
  declarations: [VisitaPage, AltaVisitaComponent, VisitaDetalleComponent, VisitaPendienteEmpleadoComponent]
})
export class VisitaPageModule {}
