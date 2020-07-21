import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UbicacionPageRoutingModule } from './ubicacion-routing.module';

import { UbicacionPage } from './ubicacion.page';
import { UbicacionAltaComponent } from './ubicacion-alta/ubicacion-alta.component';
import { VerQrUbicacionModalComponent } from './ver-qr-ubicacion-modal/ver-qr-ubicacion-modal.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  entryComponents: [UbicacionAltaComponent, VerQrUbicacionModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UbicacionPageRoutingModule,
    QRCodeModule
  ],
  declarations: [UbicacionPage, VerQrUbicacionModalComponent],
  exports: [  VerQrUbicacionModalComponent]//UbicacionAltaComponent,
})
export class UbicacionPageModule {}
