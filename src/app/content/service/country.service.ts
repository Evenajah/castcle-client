import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Country } from 'src/app/share/interface/number-country';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  getCountry() {
    return this.http
      .get<Country[]>(`${environment.httpUrl}/metadata/country`)
      .pipe(
        map((res: any) => {
          return res.payload as Country[];
        }),
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      );
  }
}
