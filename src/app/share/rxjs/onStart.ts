import { Observable, defer, MonoTypeOperatorFunction } from 'rxjs';

export function onStart<T>(project: () => void): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) =>
    defer(() => {
      project();
      return source;
    });
}
