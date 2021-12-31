import { Directive, ElementRef } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appNumberInput]',
})
export class NumberInputDirective {
  private destroy$ = new Subject<void>();

  constructor(private _el: ElementRef) {
    fromEvent(this._el.nativeElement, 'input')
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: any) => {
        const initalValue = this._el.nativeElement.value;
        this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
        if (initalValue !== this._el.nativeElement.value) {
          event.preventDefault();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
