import { KeyPath } from '../../keyPath';
import { Navigable } from '../base';

export class MapNavigator<T> extends Navigable<Map<any, T>> {
  navigate(currentPath: string): KeyPath<Map<any, T>>[] {
    return [...this.source.entries()].map(([key, value]) =>
      this.generateKeyPath(currentPath, key, value),
    );
  }

  protected buildPath(currentPath: string, key: string | number): string {
    return `${currentPath}<${key}>`;
  }
}
