import { Collector, Collectivism } from '../collector';
import { NavigatorRunner } from '../navigators';
import { KeyPathQueue } from '../queue';
import { KeyPath } from '../keyPath';
import type {
  Finder,
  NavigationEnd,
  PathFinderOptions,
  DefaultPathFinderOptions,
  ContentWithSearchablePath,
  RequiredPathFinderOptions,
} from '../interfaces';

const defaultOptions: DefaultPathFinderOptions = {
  hints: [],
  sample: Infinity,
  depthFirst: false,
  firstMatch: false,
  maxDepth: Infinity,
  strictHints: false,
  alwaysCollect: false,
};

export class PathFinder<T = any> implements Finder<T> {
  private readonly options: RequiredPathFinderOptions;

  constructor(options: PathFinderOptions) {
    this.options = { ...defaultOptions, ...options };
  }

  firstMatch<Source = T>(
    source: ContentWithSearchablePath<Source>,
    options: Partial<PathFinderOptions> = this.options,
  ): NavigationEnd<Source> | undefined {
    const [matched] = this.find(source, {
      ...options,
      firstMatch: true,
    });

    return matched;
  }

  findAll<Source = T>(
    source: ContentWithSearchablePath<Source>,
    options: Partial<PathFinderOptions> = this.options,
  ): Iterable<NavigationEnd<Source>> {
    return this.find(source, {
      ...options,
      endpoint: '*',
    });
  }

  find<Source = T>(
    source: ContentWithSearchablePath<Source>,
    options: Partial<PathFinderOptions> = this.options,
  ): Iterable<NavigationEnd<Source>> {
    const useOptions = this.optionsModifier(options);
    const collector = new Collector();

    const navigator = NavigatorRunner.for<any>({
      ...useOptions,
      depth: 0,
      original: source,
      source: source as Source,
    });

    return this.identifyEndpoints(navigator.navigate(''), collector).values();
  }

  private identifyEndpoints(keyPaths: KeyPath<T>[], collector: Collectivism): Collectivism {
    const queue = new KeyPathQueue(keyPaths, this.options);

    for (const keyPath of queue.process()) {
      const { isEndpoint, shouldContinue } = keyPath.identify(collector.size);

      if (isEndpoint || keyPath.alwaysCollect) {
        keyPath.collect(collector, isEndpoint);
      }

      if (!shouldContinue) {
        continue;
      }

      queue.add(keyPath.navigate());
    }

    return collector;
  }

  private optionsModifier(options: Partial<PathFinderOptions>): RequiredPathFinderOptions {
    const useOptions = { ...this.options, ...options };
    const { firstMatch } = useOptions;

    return firstMatch ? { ...useOptions, sample: 1 } : useOptions;
  }
}
