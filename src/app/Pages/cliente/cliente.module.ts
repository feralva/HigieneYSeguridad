import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientePageRoutingModule } from './cliente-routing.module';

import { ClientePage } from './cliente.page';
import { ClienteDetalleComponent } from './cliente-detalle/cliente-detalle.component';
import { AltaClienteComponent } from './alta-cliente/alta-cliente.component';
import { ClientePlanesComponent } from './cliente-planes/cliente-planes.component';
import { ClienteEstablecimientosComponent } from './cliente-establecimientos/cliente-establecimientos.component';
import { EstablecimientoAltaComponent } from './establecimiento-alta/establecimiento-alta.component';
import { UbicacionAltaComponent } from '../ubicacion/ubicacion-alta/ubicacion-alta.component';
import { IonicSelectableModule } from 'ionic-selectable';
import { PlanPageModule } from '../plan/plan.module';
@NgModule({
  entryComponents: [UbicacionAltaComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientePageRoutingModule,
    IonicSelectableModule,
    PlanPageModule
  ],
  declarations: [ClientePage, ClienteEstablecimientosComponent, EstablecimientoAltaComponent,
  ClienteDetalleComponent, AltaClienteComponent, ClientePlanesComponent,UbicacionAltaComponent]
})
export class ClientePageModule {}
