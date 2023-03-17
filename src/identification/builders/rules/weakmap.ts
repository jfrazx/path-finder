import type { Metadata } from '../../../interfaces';
import { SourceIdentification } from '../base';
import { Types } from '../constants';

export class WeakMapIdentifier extends SourceIdentification<Metadata> {
  canIdentify(): boolean {
    return this.source instanceof WeakMap;
  }

  identity(): Metadata {
    return {
      type: Types.WeakMap,
    };
  }
}
