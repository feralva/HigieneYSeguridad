import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SolicitarForgotPasswordComponent } from './solicitar-forgot-password/solicitar-forgot-password.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: ':idUsuario/forgotPassword/:token',
    component: ForgotPasswordComponent
  },
  {
    path: 'solicitarforgotPassword',
    component: SolicitarForgotPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
