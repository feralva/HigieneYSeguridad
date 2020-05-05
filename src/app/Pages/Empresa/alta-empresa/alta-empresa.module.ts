import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltaEmpresaPageRoutingModule } from './alta-empresa-routing.module';

import { AltaEmpresaPage } from './alta-empresa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AltaEmpresaPageRoutingModule
  ],
  declarations: [AltaEmpresaPage]
})
export class AltaEmpresaPageModule {}
