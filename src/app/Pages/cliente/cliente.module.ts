import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientePageRoutingModule } from './cliente-routing.module';

import { ClientePage } from './cliente.page';
import { ClienteDetalleComponent } from './cliente-detalle/cliente-detalle.component';
import { AltaClienteComponent } from './alta-cliente/alta-cliente.component';
import { ClientePlanesComponent } from './cliente-planes/cliente-planes.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientePageRoutingModule
  ],
  declarations: [ClientePage,
  ClienteDetalleComponent, AltaClienteComponent, ClientePlanesComponent]
})
export class ClientePageModule {}