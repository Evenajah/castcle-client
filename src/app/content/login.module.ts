import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from './../share/shared.module';
import { HomeComponent } from './home/home.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import { CountryService } from './service/country.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { NgOtpInputModule } from 'ng-otp-input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@NgModule({
  declarations: [HomeComponent, LoginComponent, OtpComponent],
  imports: [
    CommonModule,
    InputTextModule,
    LoginRoutingModule,
    DropdownModule,
    InputNumberModule,
    ReactiveFormsModule,
    FormsModule,
    // SharedModule,
    ProgressBarModule,
    NgOtpInputModule,
  ],

  exports: [HomeComponent, LoginComponent, OtpComponent],
  providers: [CountryService],
})
export class LoginModule {}
