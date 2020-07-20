import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarioPage } from './calendario.page';
import { CalendarioEventosEmpleado } from 'src/app/Core/Services/Calendario/calendarioEventosEmpleado-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: CalendarioPage,
    resolve: {
      eventosEmpleado: CalendarioEventosEmpleado
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarioPageRoutingModule {}
