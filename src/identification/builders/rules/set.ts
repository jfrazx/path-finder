import type { Metadata } from '../../../interfaces';
import { SourceIdentification } from '../base';
import { Types } from '../constants';

export interface SetMetadata extends Metadata {
  readonly size: number;
}

export class SetIdentifier extends SourceIdentification<SetMetadata> {
  canIdentify(): boolean {
    return this.source instanceof Set;
  }

  identity(): SetMetadata {
    const source: Set<unknown> = this.source;

    return {
      type: Types.Set,
      size: source.size,
    };
  }
}
