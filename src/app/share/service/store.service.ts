import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private telNumber = new BehaviorSubject<string>('');

  getTelNumber() {
    return this.telNumber;
  }

  setTelNumber(val: string) {
    this.telNumber.next(val);
  }

  constructor() {}
}
