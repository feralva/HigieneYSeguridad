import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IrregularidadPage } from './irregularidad.page';
import { IrregularidadesEmpresaResolver } from 'src/app/Core/Services/Irregularidad/irregularidadesEmpresa-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: IrregularidadPage,
    resolve: 
    {
      irregularidades: IrregularidadesEmpresaResolver
    }  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IrregularidadPageRoutingModule {}
