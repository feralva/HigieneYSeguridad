import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpleadoPageRoutingModule } from './empleado-routing.module';

import { EmpleadoPage } from './empleado.page';
import { AltaEmpleadoComponent } from './alta-empleado/alta-empleado.component';
import { EmpleadoEdicionComponent } from './empleado-edicion/empleado-edicion.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpleadoPageRoutingModule
  ],
  declarations: [EmpleadoPage,
    AltaEmpleadoComponent,
    EmpleadoEdicionComponent]
})
export class EmpleadoPageModule {}
