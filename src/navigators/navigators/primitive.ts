import { FinalKeyPath, KeyPath } from '../../keyPath';
import { Navigable } from '../base';

export class PrimitiveNavigator<T> extends Navigable<T> {
  navigate(path: string): KeyPath<T>[] {
    return [
      new FinalKeyPath({ ...this.options, currentPath: path, value: this.source, key: null }),
    ];
  }
}
