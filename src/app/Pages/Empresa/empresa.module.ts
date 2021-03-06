import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpresaPageRoutingModule } from './empresa-routing.module';

import { EmpresaPage } from './empresa.page';
import { AltaEmpresaPage } from './alta-empresa/alta-empresa.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { EditarEmpresaComponent } from './editar-empresa/editar-empresa.component';
import { SharedDirectivesModule } from 'src/app/Core/Directives/shared-directives.module';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpresaPageRoutingModule,
    IonicSelectableModule,
    SharedDirectivesModule,
    TranslateModule
  ],
  declarations: [EmpresaPage, AltaEmpresaPage, EditarEmpresaComponent]
})
export class EmpresaPageModule {}
