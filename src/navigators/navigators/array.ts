import { KeyPath } from '../../keyPath';
import { Navigable } from '../base';

export class ArrayNavigator<T> extends Navigable<Array<T>> {
  navigate(currentPath: string): KeyPath<T[]>[] {
    return this.source.map((value: T, key: number) =>
      this.generateKeyPath(currentPath, key, value),
    );
  }

  protected buildPath(currentPath: string, key: number): string {
    return `${currentPath}[${key}]`;
  }
}
