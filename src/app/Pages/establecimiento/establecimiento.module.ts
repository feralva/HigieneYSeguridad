import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstablecimientoPageRoutingModule } from './establecimiento-routing.module';

import { EstablecimientoPage } from './establecimiento.page';
import { EstablecimientoEditarComponent } from './establecimiento-editar/establecimiento-editar.component';
import { EstablecimientoDetalleComponent } from './establecimiento-detalle/establecimiento-detalle.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstablecimientoPageRoutingModule
  ],
  declarations: [EstablecimientoPage, EstablecimientoEditarComponent, EstablecimientoDetalleComponent]
})
export class EstablecimientoPageModule {}
