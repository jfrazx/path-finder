import { KeyPath } from '../keyPath';
import { Navigable } from '../base';

export class ArrayNavigator<T> extends Navigable<Array<T>> {
  navigate(currentPath: string) {
    return this.options.source
      .map(
        (value, key) =>
          new KeyPath({
            ...this.options,
            currentPath: `${currentPath}[${key}]`,
            value,
            key,
          }),
      )
      .flatMap((keyPath) => keyPath.build());
  }
}
