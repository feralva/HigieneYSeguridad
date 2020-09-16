import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarioPageRoutingModule } from './calendario-routing.module';

import { CalendarioPage } from './calendario.page';
import { NgCalendarModule } from 'ionic2-calendar';
import { SharedDirectivesModule } from 'src/app/Core/Directives/shared-directives.module';

import localeEs from '@angular/common/locales/es';
import localeDe from '@angular/common/locales/de';
import { TranslateModule } from '@ngx-translate/core';

registerLocaleData(localeDe);
registerLocaleData(localeEs); 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarioPageRoutingModule,
    SharedDirectivesModule,
    NgCalendarModule,
    TranslateModule
  ],
  declarations: [CalendarioPage]
})
export class CalendarioPageModule {}
