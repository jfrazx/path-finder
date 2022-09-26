import type { NavigationEnd } from '../interfaces';
import { Navigable } from '../base';

export class PrimitiveNavigator<T> extends Navigable<T> {
  navigate(path: string): NavigationEnd<T>[] {
    const { source, original, endPoint } = this.options;

    return [
      {
        path,
        source,
        endPoint,
        original,
        meta: this.meta(),
        isEndPoint: false,
      },
    ];
  }
}
