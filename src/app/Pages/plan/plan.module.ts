import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanPageRoutingModule } from './plan-routing.module';

import { PlanPage } from './plan.page';
import { DetallePlanComponent } from './detalle-plan/detalle-plan.component';
import { AltaPlanComponent } from './alta-plan/alta-plan.component';
import { VisitaPageModule } from '../visita/visita.module';
import { AltaVisitaPlanComponent } from './alta-visita-plan/alta-visita-plan.component';
import { IonicSelectableModule } from 'ionic-selectable';
import { PipesModule } from 'src/app/Core/pipes/pipes.module';
import { AltaVisitaPlanModalComponent } from './alta-visita-plan-modal/alta-visita-plan-modal.component';

@NgModule({
  entryComponents: [AltaVisitaPlanModalComponent], 
  imports: [    
    CommonModule,
    FormsModule,
    IonicModule,
    PlanPageRoutingModule,
    VisitaPageModule,
    IonicSelectableModule,
    PipesModule
  ],
  declarations: [PlanPage, DetallePlanComponent, AltaPlanComponent, AltaVisitaPlanComponent, AltaVisitaPlanModalComponent]
})
export class PlanPageModule {}
