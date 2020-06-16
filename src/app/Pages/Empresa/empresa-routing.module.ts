import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpresaPage } from './empresa.page';
import { AltaEmpresaPage } from './alta-empresa/alta-empresa.page';
import { EmpresasResolverService } from 'src/app/Core/Services/Empresa/empresas-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: EmpresaPage,
    resolve: {empresas: EmpresasResolverService}  
  },
  {
    path: 'alta',
    component: AltaEmpresaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpresaPageRoutingModule {}
