import { NavigationEnd } from '../navigators';

export interface Collectivism {
  add(path: string, options: NavigationEnd<any>): this;
  size: number;
}

export class Collector implements Collectivism {
  readonly paths = new Map<string, NavigationEnd<any>>();

  /**
   * @description Add a path to a containing map. Returns self
   *
   * @param {string} path
   * @param {NavigationEnd<any>} options
   * @returns {this}
   * @memberof Collector
   */
  add(path: string, options: NavigationEnd<any>): this {
    this.paths.set(path, options);

    return this;
  }

  get size(): number {
    return this.paths.size;
  }
}
