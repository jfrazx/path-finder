import type { KeyOptions, Endpoint, Metadata } from '../interfaces';
import type { EndpointIdentified } from '../endpoints/interfaces';
import { SourceIdentifier } from '../identification';
import { NavigatorRunner } from '../navigators';
import { Endpoints } from '../endpoints';

/**
 * @description KeyPath class to navigate and identify endpoints
 *
 * @export
 * @class KeyPath
 * @template T
 */
export class KeyPath<T> {
  constructor(private readonly options: KeyOptions<T>) {}

  /**
   * @description Identify an endpoint for the current KeyPath
   *
   * @param {number} collected
   * @returns {EndpointIdentified}
   * @memberof KeyPath
   */
  public identify(collected: number): EndpointIdentified {
    return this.identifier(false, collected);
  }

  protected identifier(pathComplete: boolean, collected: number): EndpointIdentified {
    return Endpoints.for({ ...this.options, pathComplete, collected });
  }

  /**
   * @description Build an endpoint for the current KeyPath
   *
   * @param {boolean} isEndpoint
   * @param {boolean} pathComplete
   * @returns {Endpoint<T>}
   * @memberof KeyPath
   *
   */
  public build(isEndpoint: boolean, pathComplete: boolean): Endpoint<T> {
    const { currentPath, original, depth, value, endpoint } = this.options;

    return {
      depth,
      endpoint,
      original,
      isEndpoint,
      pathComplete,
      source: value,
      path: currentPath,
      meta: this.meta(value),
    };
  }

  /**
   * @description Identify the source of the current KeyPath
   *
   * @protected
   * @param {T} source
   * @returns {Metadata}
   * @memberof KeyPath
   */
  protected meta(source: T): Metadata {
    return SourceIdentifier.identify(source);
  }

  /**
   * @description Navigate the current KeyPath
   *
   * @returns {KeyPath<T>[]}
   * @memberof KeyPath
   */
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

/**
 * @description A KeyPath that is a final endpoint
 *
 * @export
 * @class FinalKeyPath
 * @template T
 * @extends {KeyPath<T>}
 */
export class FinalKeyPath<T> extends KeyPath<T> {
  identify(collected: number): EndpointIdentified {
    return this.identifier(true, collected);
  }

  navigate(): KeyPath<T>[] {
    return [];
  }
}
