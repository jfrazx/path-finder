import type { Metadata } from '../../../interfaces';
import { SourceIdentification } from '../base';
import { Types } from '../constants';

export class WeakSetIdentifier extends SourceIdentification<Metadata> {
  canIdentify(): boolean {
    return this.source instanceof WeakSet;
  }

  identity(): Metadata {
    return {
      type: Types.WeakSet,
    };
  }
}
