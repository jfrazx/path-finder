import type { PathFinderOptions, ContentWithSearchablePath, Finder } from './interfaces';
import { NavigatorRunner } from './navigators';

export class PathFinder<T = any> implements Finder<T> {
  constructor(private readonly options: PathFinderOptions) {}

  find(source: ContentWithSearchablePath<T>) {
    const navigator = NavigatorRunner.for<T>({
      ...this.options,
      original: source,
      source,
    });

    return navigator.navigate('');
  }
}
