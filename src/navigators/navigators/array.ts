import { KeyPath } from '../../keyPath';
import { Navigable } from '../base';

export class ArrayNavigator<T> extends Navigable<Array<T>> {
  navigate(currentPath: string): KeyPath<T[]>[] {
    return this.source.map(
      (value: T, key: number) =>
        new KeyPath({
          ...this.options,
          currentPath: `${currentPath}[${key}]`,
          depth: this.increaseDepth,
          value,
          key,
        }),
    );
  }
}
