import type { EndpointIdentified, EndpointIdentity } from '../interfaces';
import { isString } from '../../utils';
import { EndPointer } from '../base';

export class EndpointHints<T> extends EndPointer<T> implements EndpointIdentity {
  identify(): EndpointIdentified {
    const { endpoint, key } = this.options;

    const isEndpoint = this.evaluateEndpoint(endpoint, key) && this.hintsMatch();

    return {
      isEndpoint,
      pathComplete: this.pathComplete,
      shouldContinue: this.shouldContinue(isEndpoint),
    };
  }

  private evaluateEndpoint(endpoint: string | RegExp, key: string | number | null): boolean {
    return isString(endpoint) ? endpoint === key : endpoint.test(key?.toString() as string);
  }

  private hintsMatch(): boolean {
    const { strictHints, currentPath, hints } = this.options;

    return strictHints
      ? new RegExp(
          hints.map((hint) => this.escapeRegExp(hint)).join('(\\[\\d+\\]\\.|\\.)'),
        ).test(currentPath)
      : hints.every((hint: string) => currentPath.includes(hint));
  }

  private shouldContinue(isEndpoint: boolean): boolean {
    return (
      (!isEndpoint || !this.options.preemptiveEndpoints) &&
      this.hasNotReachedMaxDepth() &&
      this.sampleSizeNotMet(isEndpoint)
    );
  }

  private escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
