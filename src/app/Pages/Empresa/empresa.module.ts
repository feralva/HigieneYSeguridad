import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpresaPageRoutingModule } from './empresa-routing.module';

import { EmpresaPage } from './empresa.page';
import { AltaEmpresaPage } from './alta-empresa/alta-empresa.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { EditarEmpresaComponent } from './editar-empresa/editar-empresa.component';
import { PagosEmpresaComponent } from './pagos-empresa/pagos-empresa.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpresaPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [EmpresaPage, AltaEmpresaPage, EditarEmpresaComponent, PagosEmpresaComponent]
})
export class EmpresaPageModule {}
