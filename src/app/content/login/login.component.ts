import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Country } from 'src/app/share/interface/number-country';
import { onStart } from 'src/app/share/rxjs/onStart';
import { StoreService } from 'src/app/share/service/store.service';
import { CountryService } from '../service/country.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  country: Country[] = [];
  selectCountry = new FormControl('');
  loading: boolean = false;
  telNumber: string = '';

  constructor(
    private countryService: CountryService,
    public router: Router,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.countryService
      .getCountry()
      .pipe(
        onStart(() => (this.loading = true)),
        finalize(() => (this.loading = false))
      )
      .subscribe((res) => {
        this.country = res;
        this.selectCountry.setValue(res.find((item) => item.code === 'TH'));
      });
  }

  goToOtpPage() {
    this.storeService.setTelNumber(
      `${this.selectCountry.value.dialCode} ${this.telNumber}`
    );
    this.router.navigate(['otp']);
  }
}
