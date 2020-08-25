import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasRoleDirective } from './has-role.directive';
import { OnlyNumberInputDirective } from './only-number-input.directive';



@NgModule({
  declarations: [HasRoleDirective, OnlyNumberInputDirective],
  imports: [
    CommonModule
  ],
  exports: [HasRoleDirective, OnlyNumberInputDirective]
})
export class SharedDirectivesModule { }
