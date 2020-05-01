import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LanguagePopupPageRoutingModule } from './language-popup-routing.module';

import { LanguagePopupPage } from './language-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LanguagePopupPageRoutingModule
  ],
  declarations: [LanguagePopupPage]
})
export class LanguagePopupPageModule {}
