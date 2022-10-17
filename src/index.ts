import type { Finder, PathFinderOptions } from './interfaces';
import { PathFinder } from './finder';

/**
 * @description Helper function that accepts PathFinderOptions and returns a Finder object
 *
 * @template T
 * @param {PathFinderOptions} options
 * @returns {Finder<T>}
 */
export const pathFinder = <T = any>(options: PathFinderOptions): Finder<T> => {
  return new PathFinder<T>(options);
};

export { PathFinder } from './finder';
export type { Finder, NavigationEnd, PathFinderOptions } from './interfaces';
