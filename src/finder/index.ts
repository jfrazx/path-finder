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
  private readonly options: PathFinderOptions;

  constructor(options: PathFinderOptions = {}) {
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
  ): NavigationEnd<Source>[] {
    return this.find(source, {
      ...options,
      endpoint: '*',
    });
  }

  find<Source = T>(
    source: ContentWithSearchablePath<Source>,
    options: Partial<PathFinderOptions> = this.options,
  ): NavigationEnd<Source>[] {
    const useOptions = this.optionsModifier(options);

    const navigator = NavigatorRunner.for<Source>({
      ...useOptions,
      depth: 0,
      original: source,
      source: source as Source,
    });

    return this.identifyEndpoints<Source>(navigator.navigate(''), useOptions);
  }

  private identifyEndpoints<Source>(
    keyPaths: KeyPath<Source>[],
    options: RequiredPathFinderOptions,
  ): NavigationEnd<Source>[] {
    const queue = new KeyPathQueue(keyPaths, options);
    const collector = new Collector();

    this.processQueue(queue, collector);

    return [...collector.values()];
  }

  private processQueue(queue: KeyPathQueue, collector: Collectivism): void {
    for (const keyPath of queue.process()) {
      const { isEndpoint, shouldContinue } = keyPath.identify(collector.size);

      if (isEndpoint || keyPath.alwaysCollect) {
        keyPath.collect(collector, isEndpoint);
      }

      if (shouldContinue) {
        queue.add(keyPath.navigate());
      }
    }
  }

  private optionsModifier(options: Partial<PathFinderOptions>): RequiredPathFinderOptions {
    const useOptions = { ...this.options, ...options } as RequiredPathFinderOptions;
    const { firstMatch } = useOptions;

    this.validateEndpoint(useOptions.endpoint);

    return firstMatch ? { ...useOptions, sample: 1 } : useOptions;
  }

  private validateEndpoint(endpoint: string | undefined): never | void {
    if (typeof endpoint !== 'string' || endpoint.trim() === '') {
      throw new Error(`${this.className}: No endpoint provided`);
    }
  }

  protected get className(): string {
    return this.constructor.name;
  }
}
