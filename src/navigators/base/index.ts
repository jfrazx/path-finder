import type { NavigatorOptions } from '../../interfaces';
import type { Navigator } from '../interfaces';
import { KeyPath } from '../../keyPath';

export abstract class Navigable<T> implements Navigator<T> {
  protected abstract buildPath(currentPath: string, key: number | string): string;
  abstract navigate(currentPath: string): KeyPath<T>[];

  constructor(protected options: NavigatorOptions<T>) {}

  protected get source(): T {
    return this.options.source;
  }

  protected get increaseDepth(): number {
    return this.options.depth + 1;
  }

  /**
   * @description Generate a KeyPath for the current navigator
   *
   * @protected
   * @param {string} path
   * @param {(string | number)} key
   * @param {*} value
   * @returns {KeyPath<T>}
   * @memberof Navigable
   */
  protected generateKeyPath(path: string, key: string | number, value: any): KeyPath<T> {
    return new KeyPath({
      ...this.options,
      currentPath: this.buildPath(path, key),
      depth: this.increaseDepth,
      value,
      key,
    });
  }
}
