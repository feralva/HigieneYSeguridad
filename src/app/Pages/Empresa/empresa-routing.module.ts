import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpresaPage } from './empresa.page';
import { AltaEmpresaPage } from './alta-empresa/alta-empresa.page';
import { EmpresasResolverService } from 'src/app/Core/Services/Empresa/empresas-resolver.service';
import { EditarEmpresaComponent } from './editar-empresa/editar-empresa.component';
import { EmpresaDetalleResolverService } from 'src/app/Core/Services/Empresa/empresaDetalle-resolver.service';
import { UserAuthenticatedGuard } from 'src/app/Core/Guards/user-authenticated.guard';
import { MiembroEmpresaGuard } from 'src/app/Core/Guards/Empresa/miembro-empresa.guard';

const routes: Routes = [
  {
    path: '',
    component: EmpresaPage,
    canActivate: [UserAuthenticatedGuard],    
    resolve: {empresas: EmpresasResolverService}  
  },
  {
    path: 'alta',
    component: AltaEmpresaPage
  },
  {
    path: ':id/editar',
    component: EditarEmpresaComponent,
    canActivate: [UserAuthenticatedGuard/* , MiembroEmpresaGuard */],  
    resolve: 
    {
      empresa: EmpresaDetalleResolverService
    }   
  },
  {
    path: 'editar',
    component: EditarEmpresaComponent,
    canActivate: [UserAuthenticatedGuard],    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpresaPageRoutingModule {}
