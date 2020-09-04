import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SolicitarForgotPasswordComponent } from './solicitar-forgot-password/solicitar-forgot-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage, ForgotPasswordComponent, SolicitarForgotPasswordComponent]
})
export class LoginPageModule {}
