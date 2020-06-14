import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpleadoPageRoutingModule } from './empleado-routing.module';

import { EmpleadoPage } from './empleado.page';
import { AltaEmpleadoComponent } from './alta-empleado/alta-empleado.component';
import { EmpleadoEdicionComponent } from './empleado-edicion/empleado-edicion.component';
import { EmpleadoDetalleComponent } from './empleado-detalle/empleado-detalle.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpleadoPageRoutingModule
  ],
  declarations: [EmpleadoPage,
    AltaEmpleadoComponent, EmpleadoDetalleComponent,
    EmpleadoEdicionComponent]
})
export class EmpleadoPageModule {}
