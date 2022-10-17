import { NavigationEnd } from '../interfaces';

export interface Collectivism {
  values(): IterableIterator<NavigationEnd<any>>;
  add(options: NavigationEnd<any>): this;
  size: number;
}

export class Collector implements Collectivism {
  readonly paths = new Map<string, NavigationEnd<any>>();

  /**
   * @description Add a NavigationEnd object to a containing map.
   *
   * @param {NavigationEnd<any>} options
   * @returns {this}
   * @memberof Collector
   */
  add(options: NavigationEnd<any>): this {
    this.paths.set(options.path, options);

    return this;
  }

  get size(): number {
    return this.paths.size;
  }

  values(): IterableIterator<NavigationEnd<any>> {
    return this.paths.values();
  }
}
