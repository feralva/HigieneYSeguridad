import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UbicacionPageRoutingModule } from './ubicacion-routing.module';

import { UbicacionPage } from './ubicacion.page';
import { UbicacionAltaComponent } from './ubicacion-alta/ubicacion-alta.component';
import { VerQrUbicacionModalComponent } from './ver-qr-ubicacion-modal/ver-qr-ubicacion-modal.component';
import { QRCodeModule } from 'angularx-qrcode';
import { BuscarUbicacionComponent } from './buscar-ubicacion/buscar-ubicacion.component';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  entryComponents: [UbicacionAltaComponent, VerQrUbicacionModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UbicacionPageRoutingModule,
    QRCodeModule,
    IonicSelectableModule
  ],
  declarations: [UbicacionPage, VerQrUbicacionModalComponent, BuscarUbicacionComponent, UbicacionAltaComponent],
  exports: [  VerQrUbicacionModalComponent, BuscarUbicacionComponent, UbicacionAltaComponent]
})
export class UbicacionPageModule {}
