import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LanguagePopupPage } from './language-popup.page';

const routes: Routes = [
  {
    path: '',
    component: LanguagePopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LanguagePopupPageRoutingModule {}
