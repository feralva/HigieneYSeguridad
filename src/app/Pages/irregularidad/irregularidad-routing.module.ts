import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IrregularidadPage } from './irregularidad.page';
import { IrregularidadesEmpresaResolver } from 'src/app/Core/Services/Irregularidad/irregularidadesEmpresa-resolver.service';
import { AltaIrregularidadComponent } from './alta-irregularidad/alta-irregularidad.component';
import { ClienteResolver } from 'src/app/Core/Services/Cliente/cliente-resolver.service';
import { IrregularidadesTiposResolver } from 'src/app/Core/Services/Irregularidad/irregularidadTipos-resolver.service';
import { IrregularidadDetalleResolver } from 'src/app/Core/Services/Irregularidad/irregularidadDetalle-resolver.service';
import { CerrarIrregularidadComponent } from './cerrar-irregularidad/cerrar-irregularidad.component';
import { IrregularidadesDeEstablecimientoDeClientePropioGuard } from 'src/app/Core/Guards/Irregularidades/irregularidades-de-establecimiento-de-cliente-propio.guard';
import { IrregularidadDeEstablecimientoDeClientePropioGuard } from 'src/app/Core/Guards/Irregularidades/irregularidad-de-establecimiento-de-cliente-propio.guard';

const routes: Routes = [
  {
    path: '',
    component: IrregularidadPage,
    resolve: 
    {
      irregularidades: IrregularidadesEmpresaResolver,
      clientes: ClienteResolver
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
  },
  {
    path: 'establecimiento/:idEstablecimiento/alta',
    component: AltaIrregularidadComponent,
    resolve: 
    {
      clientes: ClienteResolver,
      tiposIrregularidades: IrregularidadesTiposResolver
    },
    canActivate: [ IrregularidadesDeEstablecimientoDeClientePropioGuard ]
  },
  {
    path: ':idIrregularidad/cerrar',
    component: CerrarIrregularidadComponent,
    resolve: 
    {
      irregularidad: IrregularidadDetalleResolver
    },
    canActivate: [ IrregularidadDeEstablecimientoDeClientePropioGuard ]  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IrregularidadPageRoutingModule {}
