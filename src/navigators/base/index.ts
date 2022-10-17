import type { NavigatorOptions } from '../../interfaces';
import type { Navigator } from '../interfaces';
import type { KeyPath } from '../../keyPath';

export abstract class Navigable<T> implements Navigator<T> {
  abstract navigate(currentPath: string): KeyPath<T>[];

  constructor(protected options: NavigatorOptions<T>) {}

  protected get source(): T {
    return this.options.source;
  }

  protected get increaseDepth(): number {
    return this.options.depth + 1;
  }
}
