import type { Metadata } from '../../../interfaces';
import { SourceIdentification } from '../base';
import { Types } from '../constants';

export interface ArrayMetadata extends Metadata {
  readonly length: number;
}

export class ArrayIdentifier extends SourceIdentification<ArrayMetadata> {
  canIdentify(): boolean {
    return Array.isArray(this.source);
  }

  identity(): ArrayMetadata {
    return {
      type: Types.Array,
      length: this.source.length,
    };
  }
}
