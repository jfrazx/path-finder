import { FinalKeyPath, KeyPath } from '../../keyPath';
import { Navigable } from '../base';

export class PrimitiveNavigator<T> extends Navigable<T> {
  navigate(path: string): KeyPath<T>[] {
    return [
      new FinalKeyPath({
        ...this.options,
        currentPath: this.buildPath(path),
        value: this.source,
        key: null,
      }),
    ];
  }

  protected buildPath(currentPath: string): string {
    return currentPath;
  }
}
