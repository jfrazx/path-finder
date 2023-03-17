import type { EndpointIdentified, EndpointIdentity } from '../interfaces';
import { EndPointer } from '../base';

export class EndpointsAll<T> extends EndPointer<T> implements EndpointIdentity {
  identify(): EndpointIdentified {
    return {
      isEndpoint: true,
      pathComplete: this.pathComplete,
      shouldContinue: this.hasNotReachedMaxDepth() && this.sampleSizeNotMet(true),
    };
  }
}
