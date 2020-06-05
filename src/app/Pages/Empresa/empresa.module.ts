import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpresaPageRoutingModule } from './empresa-routing.module';

import { EmpresaPage } from './empresa.page';
import { AltaEmpresaPage } from './alta-empresa/alta-empresa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpresaPageRoutingModule
  ],
  declarations: [EmpresaPage, AltaEmpresaPage]
})
export class EmpresaPageModule {}
