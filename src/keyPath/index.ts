import type { KeyOptions, NavigationEnd } from '../interfaces';
import { NavigatorRunner } from '../navigators';
import { Collectivism } from '../collector';
import { Endpoints } from '../endpoints';
import { Meta } from '../meta';

export class KeyPath<T> extends Meta<T> {
  constructor(protected readonly options: KeyOptions<T>) {
    super(options);
  }

  identify(collected: number) {
    return this.identifier(false, collected);
  }

  protected identifier(pathComplete: boolean, collected: number) {
    return Endpoints.for({ ...this.options, pathComplete, collected });
  }

  collect(collector: Collectivism, isEndpoint: boolean) {
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
