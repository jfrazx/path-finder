import type { Metadata } from '../../../interfaces';
import { SourceIdentification } from '../base';
import { Types } from '../constants';

export class NullIdentifier extends SourceIdentification<Metadata> {
  canIdentify(): boolean {
    return this.source === null;
  }

  identity(): Metadata {
    return {
      type: Types.Null,
    };
  }
}
