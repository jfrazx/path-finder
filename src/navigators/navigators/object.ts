import { KeyPath } from '../keyPath';
import { Navigable } from '../base';

export class ObjectNavigator<T extends object = any> extends Navigable<T> {
  navigate(currentPath: string) {
    return Object.entries(this.options.source)
      .map(
        ([key, value]) =>
          new KeyPath({
            ...this.options,
            currentPath: this.buildPath(key, currentPath),
            value,
            key,
          }),
      )
      .flatMap((keyPath) => keyPath.build());
  }

  buildPath(key: string, currentPath: string): string {
    return [currentPath, key].filter((v) => v).join('.');
  }
}
