import type { ObjectMetadata } from './object';
import { ObjectIdentifier } from './object';
import { Types } from '../constants';

export interface ConstructorMetadata extends ObjectMetadata {
  readonly instance: string;
}

export class ConstructorIdentifier extends ObjectIdentifier<ConstructorMetadata> {
  canIdentify(): boolean {
    return this.isObject() && this.hasConstructor();
  }

  identity(): ConstructorMetadata {
    return {
      ...super.identity(),
      instance: this.className,
      type: Types.Class,
    };
  }
}
