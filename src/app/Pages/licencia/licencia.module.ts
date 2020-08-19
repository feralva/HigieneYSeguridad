import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LicenciaPageRoutingModule } from './licencia-routing.module';

import { LicenciaPage } from './licencia.page';
import { DetalleLicenciaComponent } from './detalle-licencia/detalle-licencia.component';
import { AdquirirLicenciaComponent } from './adquirir-licencia/adquirir-licencia.component';
import { StripeComponent } from './stripe/stripe.component';
import { AltaTipoLicenciaComponent } from './alta-tipo-licencia/alta-tipo-licencia.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LicenciaPageRoutingModule
  ],
  declarations: [LicenciaPage, DetalleLicenciaComponent, AdquirirLicenciaComponent, StripeComponent, AltaTipoLicenciaComponent ]
})
export class LicenciaPageModule {}
