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
import { ActualizacionPrecioLicenciaComponent } from './actualizacion-precio-licencia/actualizacion-precio-licencia.component';
import { IonicSelectableModule } from 'ionic-selectable';
import { ModificarTipoLicenciaComponent } from './modificar-tipo-licencia/modificar-tipo-licencia.component';
import { TiposLicenciaComponent } from './tipos-licencia/tipos-licencia.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LicenciaPageRoutingModule,
    IonicSelectableModule,
    TranslateModule
  ],
  declarations: [LicenciaPage, DetalleLicenciaComponent, AdquirirLicenciaComponent, StripeComponent, AltaTipoLicenciaComponent, 
    ActualizacionPrecioLicenciaComponent, ModificarTipoLicenciaComponent, TiposLicenciaComponent, ModificarTipoLicenciaComponent]
})
export class LicenciaPageModule {}
