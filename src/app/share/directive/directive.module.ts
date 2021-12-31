import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberInputDirective } from './number-input.directive';

@NgModule({
  declarations: [NumberInputDirective],
  imports: [CommonModule],
  exports: [NumberInputDirective],
})
export class DirectiveModule {}
