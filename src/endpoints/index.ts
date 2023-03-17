import type { EndpointIdentityOptions } from '../interfaces';
import { EndpointHints, EndpointsAll } from './endpoints';
import type { EndpointIdentified } from './interfaces';

export abstract class Endpoints {
  static for<T>(options: EndpointIdentityOptions<T>): EndpointIdentified {
    return options.endpoint === '*'
      ? new EndpointsAll(options).identify()
      : new EndpointHints(options).identify();
  }
}
