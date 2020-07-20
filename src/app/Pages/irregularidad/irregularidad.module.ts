import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IrregularidadPageRoutingModule } from './irregularidad-routing.module';

import { IrregularidadPage } from './irregularidad.page';
import { AltaIrregularidadComponent } from './alta-irregularidad/alta-irregularidad.component';
import { CerrarIrregularidadComponent } from './cerrar-irregularidad/cerrar-irregularidad.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IrregularidadPageRoutingModule
  ],
  declarations: [IrregularidadPage, AltaIrregularidadComponent, CerrarIrregularidadComponent]
})
export class IrregularidadPageModule {}
