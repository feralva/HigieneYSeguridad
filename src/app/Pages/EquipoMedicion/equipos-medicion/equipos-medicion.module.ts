import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquiposMedicionPageRoutingModule } from './equipos-medicion-routing.module';

import { EquiposMedicionPage } from './equipos-medicion.page';
import { AltaEquipoMedicionComponent } from '../alta-equipo-medicion/alta-equipo-medicion.component';
import { ModificarCantidadEquiposMedicionComponent } from '../modificar-cantidad-equipos-medicion/modificar-cantidad-equipos-medicion.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquiposMedicionPageRoutingModule
  ],
  declarations: [EquiposMedicionPage, AltaEquipoMedicionComponent, ModificarCantidadEquiposMedicionComponent]
})
export class EquiposMedicionPageModule {}
