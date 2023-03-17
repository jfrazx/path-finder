import type { EndpointIdentified, EndpointIdentity } from '../interfaces';
import { EndPointer } from '../base';

export class EndpointHints<T> extends EndPointer<T> implements EndpointIdentity {
  identify(): EndpointIdentified {
    const { endpoint, key } = this.options;

    const isEndpoint = endpoint === key && this.hintsMatch();

    return {
      isEndpoint,
      pathComplete: this.pathComplete,
      shouldContinue:
        !isEndpoint && this.hasNotReachedMaxDepth() && this.sampleSizeNotMet(isEndpoint),
    };
  }

  private hintsMatch(): boolean {
    const { strictHints, currentPath, hints } = this.options;

    return strictHints
      ? new RegExp(hints.join('(\\[\\d+\\]\\.|\\.)')).test(currentPath)
      : hints.every((hint: string) => currentPath.includes(hint));
  }
}
