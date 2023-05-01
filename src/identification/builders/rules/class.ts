import type { ObjectMetadata } from './object';
import { ObjectIdentifier } from './object';
import { Types } from '../constants';

export interface ClassMetadata extends ObjectMetadata {
  readonly instance: string;
}

export class ClassIdentifier extends ObjectIdentifier<ClassMetadata> {
  canIdentify(): boolean {
    return this.isObject() && this.hasConstructor();
  }

  identity(): ClassMetadata {
    return {
      ...super.identity(),
      instance: this.className as string,
      type: Types.Class,
    };
  }
}
