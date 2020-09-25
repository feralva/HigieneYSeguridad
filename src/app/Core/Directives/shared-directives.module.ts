import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasRoleDirective } from './has-role.directive';
import { OnlyNumberInputDirective } from './only-number-input.directive';
import { HasPatenteDirective } from './has-patente.directive';



@NgModule({
  declarations: [HasRoleDirective, OnlyNumberInputDirective, HasPatenteDirective],
  imports: [
    CommonModule
  ],
  exports: [HasRoleDirective, OnlyNumberInputDirective, HasPatenteDirective]
})
export class SharedDirectivesModule { }
