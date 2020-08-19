import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LicenciaPage } from './licencia.page';
import { DetalleLicenciaComponent } from './detalle-licencia/detalle-licencia.component';
import { AdquirirLicenciaComponent } from './adquirir-licencia/adquirir-licencia.component';
import { TiposLicenciaResolver } from 'src/app/Core/Services/Licencia/tiposLicencia-resolver.service';
import { LicenciasResolver } from 'src/app/Core/Services/Licencia/licencias-resolve.service';
import { LicenciaEmpresaResolver } from 'src/app/Core/Services/Licencia/licenciaEmpresa-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: LicenciaPage,
    resolve: {
      licencias: LicenciasResolver
    }
  },
  {
    path: 'detalle',
    component: DetalleLicenciaComponent,
    resolve: {
      licencia: LicenciaEmpresaResolver
    }
  },
  {
    path: 'adquisicion',
    component: AdquirirLicenciaComponent,
    resolve: {
      tiposLicencia: TiposLicenciaResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LicenciaPageRoutingModule {}
