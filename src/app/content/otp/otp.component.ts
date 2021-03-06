import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { StoreService } from 'src/app/share/service/store.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  telNumber: string = '';
  private destroy$ = new Subject<void>();
  otpKey: string = '';
  timerResendCode: number = 5;
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  otpVal: string = '';
  showSendBtn: boolean = false;

  constructor(private storeService: StoreService, public router: Router) {}

  ngOnInit(): void {
    this.generateOtpKey();
    this.setTelNumber();
    this.intervalSendOtp();
  }

  private intervalSendOtp() {
    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.timerResendCode === 0) {
          this.showSendBtn = true;
          return;
        }
        this.timerResendCode -= 1;
      });
  }

  private setTelNumber() {
    this.storeService
      .getTelNumber()
      .pipe(
        filter((tel) => {
          if (!tel) {
            this.router.navigate(['login']);
            return false;
          }
          return true;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((tel) => {
        this.telNumber = tel;
      });
  }

  generateOtpKey() {
    this.otpKey = Math.random().toString(36).slice(6);
  }

  sendAgainClick() {
    this.showSendBtn = !this.showSendBtn;
    this.clearOtp();
  }
  clearOtp() {
    this.generateOtpKey();
    this.ngOtpInput.setValue('');
    this.timerResendCode = 5;
  }

  onOtpChange(otp: string) {
    this.otpVal = otp;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
