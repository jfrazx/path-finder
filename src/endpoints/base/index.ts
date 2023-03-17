import type { EndpointIdentified, EndpointIdentity } from '../interfaces';
import type { EndpointIdentityOptions } from '../../interfaces';

export abstract class EndPointer<T> implements EndpointIdentity {
  constructor(protected options: EndpointIdentityOptions<T>) {}

  abstract identify(): EndpointIdentified;

  protected hasNotReachedMaxDepth(): boolean {
    const { depth, maxDepth } = this.options;

    return depth < maxDepth;
  }

  /**
   * @description Determine if an adequate sample size has been collected.
   *
   * @note Increment by one if we're at an endpoint
   *
   * @protected
   * @param {boolean} isEndpoint
   * @returns {boolean}
   * @memberof EndPointer
   */
  protected sampleSizeNotMet(isEndpoint: boolean): boolean {
    const modifier = isEndpoint ? 1 : 0;

    return this.options.collected + modifier < this.options.sample;
  }

  protected get pathComplete(): boolean {
    return this.options.pathComplete;
  }
}
