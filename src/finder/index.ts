import { NavigatorRunner, Navigator } from '../navigators';
import { isRegExp, isString } from '../utils';
import { Collector } from '../collector';
import { KeyPathQueue } from '../queue';
import { KeyPath } from '../keyPath';
import type {
  Finder,
  Endpoint,
  Endpoints,
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
  preemptiveEndpoints: true,
};

export class PathFinder<T = any> implements Finder<T> {
  private readonly options: PathFinderOptions;

  constructor(options: PathFinderOptions = {}) {
    this.options = { ...defaultOptions, ...options };
  }

  first<Source = T>(
    source: ContentWithSearchablePath<Source>,
    options: Partial<PathFinderOptions> = this.options,
  ): Endpoint<Source> | undefined {
    const [matched] = this.find(source, {
      ...options,
      firstMatch: true,
    });

    return matched;
  }

  map<Source = T>(
    source: ContentWithSearchablePath<Source>,
    options: Partial<PathFinderOptions> = this.options,
  ): Endpoints<Source> {
    return this.find(source, {
      ...options,
      endpoint: '*',
    });
  }

  find<Source = T>(
    source: ContentWithSearchablePath<Source>,
    options: Partial<PathFinderOptions> = this.options,
  ): Endpoints<Source> {
    const useOptions: Required<PathFinderOptions> = this.optionsModifier(options);

    const navigator: Navigator<Source> = NavigatorRunner.for<Source>({
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
  ): Endpoint<Source>[] {
    const queue = new KeyPathQueue(keyPaths, options);
    const collector = this.processQueue(queue, new Collector());

    return [...collector.values()];
  }

  /**
   * @description Processes keypath objects to identify endpoints
   *
   * @private
   * @param {KeyPathQueue} queue
   * @param {Collector} collector
   * @memberof PathFinder
   */
  private processQueue(queue: KeyPathQueue, collector: Collector): Collector {
    for (const keyPath of queue.process()) {
      const { isEndpoint, shouldContinue, pathComplete } = keyPath.identify(collector.size);

      if (isEndpoint || keyPath.alwaysCollect) {
        collector.collect(keyPath.build(isEndpoint, pathComplete));
      }

      if (shouldContinue) {
        queue.add(keyPath.navigate());
      }
    }

    return collector;
  }

  private optionsModifier(options: Partial<PathFinderOptions>): RequiredPathFinderOptions {
    const useOptions = { ...this.options, ...options } as RequiredPathFinderOptions;
    const { firstMatch } = useOptions;

    this.validateEndpoint(useOptions.endpoint);

    return firstMatch ? { ...useOptions, sample: 1 } : useOptions;
  }

  private validateEndpoint(endpoint: RegExp | string | undefined): never | void {
    if ((!isString(endpoint) || endpoint.trim() === '') && !isRegExp(endpoint)) {
      throw new Error(`${this.className}: No suitable endpoint provided: ${endpoint}`);
    }
  }

  protected get className(): string {
    return this.constructor.name;
  }
}
