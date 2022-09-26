import type { KeyOptions, NavigationEnd } from '../interfaces';
import { NavigatorRunner } from '../rules';
import { Meta } from '../../meta';

export class KeyPath<T> extends Meta<T> {
  constructor(protected readonly options: KeyOptions<T>) {
    super(options);
  }

  build(): NavigationEnd<T>[] {
    const { endPoint, key, currentPath, value, original } = this.options;
    const isEndPoint = endPoint === key;

    return isEndPoint
      ? [
          {
            original,
            endPoint,
            isEndPoint,
            source: value,
            path: currentPath,
            meta: this.meta(value),
          },
        ]
      : this.navigate(currentPath);
  }

  private navigate(currentPath: string) {
    const { value, endPoint, original } = this.options;

    return NavigatorRunner.for({ endPoint, source: value, original }).navigate(currentPath);
  }
}
