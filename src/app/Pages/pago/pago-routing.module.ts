import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagoPage } from './pago.page';
import { PagosResolverService } from 'src/app/Core/Services/Pago/pagos-resolver.service';

const routes: Routes = [
  {
    path: ':id',
    component: PagoPage,
    resolve: {
      pagos: PagosResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagoPageRoutingModule {}
