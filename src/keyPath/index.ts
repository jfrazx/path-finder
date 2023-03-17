import type { KeyOptions, NavigationEnd, Metadata } from '../interfaces';
import type { EndpointIdentified } from '../endpoints/interfaces';
import { SourceIdentifier } from '../identification';
import { NavigatorRunner } from '../navigators';
import { Collectivism } from '../collector';
import { Endpoints } from '../endpoints';

export class KeyPath<T> {
  constructor(private readonly options: KeyOptions<T>) {}

  identify(collected: number) {
    return this.identifier(false, collected);
  }

  protected identifier(pathComplete: boolean, collected: number): EndpointIdentified {
    return Endpoints.for({ ...this.options, pathComplete, collected });
  }

  collect(collector: Collectivism, isEndpoint: boolean): Collectivism {
    const navigationEnd = this.build(isEndpoint);

    return collector.add(navigationEnd);
  }

  private build(isEndpoint: boolean): NavigationEnd<T> {
    const { currentPath, original, depth, value, endpoint } = this.options;

    return {
      depth,
      endpoint,
      original,
      isEndpoint,
      source: value,
      path: currentPath,
      meta: this.meta(value),
    };
  }

  protected meta(source: T): Metadata {
    return SourceIdentifier.identify(source);
  }

  navigate(): KeyPath<T>[] {
    const { value, currentPath, ...options } = this.options;

    return NavigatorRunner.for<T>({
      ...options,
      source: value,
    }).navigate(currentPath);
  }

  get alwaysCollect(): boolean {
    return this.options.alwaysCollect;
  }
}

export class FinalKeyPath<T> extends KeyPath<T> {
  identify(collected: number) {
    return this.identifier(true, collected);
  }

  navigate(): KeyPath<T>[] {
    return [];
  }
}
