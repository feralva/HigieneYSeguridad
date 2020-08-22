import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LicenciaPage } from './licencia.page';
import { DetalleLicenciaComponent } from './detalle-licencia/detalle-licencia.component';
import { AdquirirLicenciaComponent } from './adquirir-licencia/adquirir-licencia.component';
import { TiposLicenciaResolver } from 'src/app/Core/Services/Licencia/tiposLicencia-resolver.service';
import { LicenciasResolver } from 'src/app/Core/Services/Licencia/licencias-resolve.service';
import { LicenciaEmpresaResolver } from 'src/app/Core/Services/Licencia/licenciaEmpresa-resolver.service';
import { AltaTipoLicenciaComponent } from './alta-tipo-licencia/alta-tipo-licencia.component';
import { ActualizacionPrecioLicenciaComponent } from './actualizacion-precio-licencia/actualizacion-precio-licencia.component';
import { TiposLicenciaComponent } from './tipos-licencia/tipos-licencia.component';

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
  },
  {
    path: 'tipos',
    component: TiposLicenciaComponent,
    resolve: {
      tiposLicencias: TiposLicenciaResolver
    }
  },
  {
    path: 'tipo/:idTipoLicencia/actualizarPrecio',
    component: ActualizacionPrecioLicenciaComponent,
    resolve: {
      tiposLicencias: TiposLicenciaResolver
    }
  },
  {
    path: 'tipo/actualizarPrecio',
    component: ActualizacionPrecioLicenciaComponent,
    resolve: {
      tiposLicencias: TiposLicenciaResolver
    }
  },
  {
    path: 'tipo/alta',
    component: AltaTipoLicenciaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LicenciaPageRoutingModule {}
