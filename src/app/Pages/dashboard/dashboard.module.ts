import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { DashboardPage } from './dashboard.page';
import { ChartsModule } from 'ng2-charts';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    ChartsModule,
    Ng2GoogleChartsModule,
    TranslateModule
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
