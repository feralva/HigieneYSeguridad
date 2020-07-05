import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanPageRoutingModule } from './plan-routing.module';

import { PlanPage } from './plan.page';
import { DetallePlanComponent } from './detalle-plan/detalle-plan.component';
import { AltaPlanComponent } from './alta-plan/alta-plan.component';
import { VisitaPageModule } from '../visita/visita.module';
import { AltaVisitaModalComponent } from '../Visita/alta-visita-modal/alta-visita-modal.component';
import { AltaVisitaPlanComponent } from './alta-visita-plan/alta-visita-plan.component';

@NgModule({
  entryComponents: [AltaVisitaModalComponent],
  imports: [    
    CommonModule,
    FormsModule,
    IonicModule,
    PlanPageRoutingModule,
    VisitaPageModule
  ],
  declarations: [PlanPage, DetallePlanComponent, AltaPlanComponent, AltaVisitaModalComponent, AltaVisitaPlanComponent]
})
export class PlanPageModule {}
