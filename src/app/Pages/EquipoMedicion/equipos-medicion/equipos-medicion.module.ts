import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquiposMedicionPageRoutingModule } from './equipos-medicion-routing.module';

import { EquiposMedicionPage } from './equipos-medicion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquiposMedicionPageRoutingModule
  ],
  declarations: [EquiposMedicionPage]
})
export class EquiposMedicionPageModule {}
