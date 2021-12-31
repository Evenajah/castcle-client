import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './service/interceptor.service';
import { DirectiveModule } from './directive/directive.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreService } from './service/store.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    DirectiveModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    StoreService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
})
export class SharedModule {}
