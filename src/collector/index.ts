import type { Endpoint } from '../interfaces';

export class Collector extends Map<string, Endpoint<any>> {
  collect(navigationEnd: Endpoint<any>): this {
    return this.set(navigationEnd.path, navigationEnd);
  }
}
