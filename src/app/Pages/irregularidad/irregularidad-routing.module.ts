import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IrregularidadPage } from './irregularidad.page';
import { IrregularidadesEmpresaResolver } from 'src/app/Core/Services/Irregularidad/irregularidadesEmpresa-resolver.service';
import { AltaIrregularidadComponent } from './alta-irregularidad/alta-irregularidad.component';
import { ClienteResolver } from 'src/app/Core/Services/Cliente/cliente-resolver.service';
import { IrregularidadesTiposResolver } from 'src/app/Core/Services/Irregularidad/irregularidadTipos-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: IrregularidadPage,
    resolve: 
    {
      irregularidades: IrregularidadesEmpresaResolver
    }  
  },
  {
    path: 'alta',
    component: AltaIrregularidadComponent,
    resolve: 
    {
      clientes: ClienteResolver,
      tiposIrregularidades: IrregularidadesTiposResolver
    }  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IrregularidadPageRoutingModule {}
