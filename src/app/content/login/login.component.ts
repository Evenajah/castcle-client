import { Component, OnInit } from '@angular/core';
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
  selectCountry!: Country;
  loading: boolean = false;
  telNumber: string = '';

  constructor(
    private countryService: CountryService,
    public router: Router,
    private storeService: StoreService
  ) {
    this.countryService
      .getCountry()
      .pipe(
        onStart(() => (this.loading = true)),
        finalize(() => (this.loading = false))
      )
      .subscribe((res) => {
        this.country = res;
      });
  }
  ngOnInit(): void {}

  goToOtpPage() {
    this.storeService.setTelNumber(
      `${this.selectCountry.dialCode} ${this.telNumber}`
    );
    this.router.navigate(['otp']);
  }
}
