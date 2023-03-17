import { KeyPath } from '../../keyPath';
import { Navigable } from '../base';

export class ObjectNavigator<T extends object> extends Navigable<T> {
  navigate(currentPath: string): KeyPath<T>[] {
    return Object.entries(this.source).map(([key, value]: [string, T[keyof T]]) =>
      this.generateKeyPath(currentPath, key, value),
    );
  }

  protected buildPath(currentPath: string, key: string): string {
    return [currentPath, key].filter((v: string) => v).join('.');
  }
}
