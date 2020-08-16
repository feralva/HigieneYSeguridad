import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LicenciaPage } from './licencia.page';
import { DetalleLicenciaComponent } from './detalle-licencia/detalle-licencia.component';
import { AdquirirLicenciaComponent } from './adquirir-licencia/adquirir-licencia.component';
import { TiposLicenciaResolver } from 'src/app/Core/Services/Licencia/tiposLicencia-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: LicenciaPage
  },
  {
    path: 'detalle',
    component: DetalleLicenciaComponent
  },
  {
    path: 'adquisicion',
    component: AdquirirLicenciaComponent,
    resolve:{
      tiposLicencia:TiposLicenciaResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LicenciaPageRoutingModule {}
