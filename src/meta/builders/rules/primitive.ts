import type { Metadata } from '../../../interfaces';
import { SourceIdentification } from '../base';

export class PrimitiveIdentifier extends SourceIdentification<Metadata> {
  canIdentify(): boolean {
    return true;
  }

  identity(): Metadata {
    return {
      type: typeof this.source,
    };
  }
}
