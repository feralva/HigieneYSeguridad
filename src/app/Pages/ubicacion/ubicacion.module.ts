import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UbicacionPageRoutingModule } from './ubicacion-routing.module';

import { UbicacionPage } from './ubicacion.page';
import { UbicacionAltaComponent } from './ubicacion-alta/ubicacion-alta.component';

@NgModule({
  entryComponents: [UbicacionAltaComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UbicacionPageRoutingModule
  ],
  declarations: [UbicacionPage],
  exports: [ UbicacionAltaComponent ]
})
export class UbicacionPageModule {}
