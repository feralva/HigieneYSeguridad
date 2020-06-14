import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstablecimientoPageRoutingModule } from './establecimiento-routing.module';

import { EstablecimientoPage } from './establecimiento.page';
import { EstablecimientoEditarComponent } from './establecimiento-editar/establecimiento-editar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstablecimientoPageRoutingModule
  ],
  declarations: [EstablecimientoPage, EstablecimientoEditarComponent]
})
export class EstablecimientoPageModule {}
