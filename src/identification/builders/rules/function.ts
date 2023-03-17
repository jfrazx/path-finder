import { Metadata } from '../../../interfaces';
import { SourceIdentification } from '../base';
import { Types } from '../constants';

export interface FunctionMetadata extends Metadata {
  readonly length: number;
  readonly name: string;
}

export class FunctionIdentifier extends SourceIdentification<FunctionMetadata> {
  canIdentify(): boolean {
    return typeof this.source === Types.Function;
  }

  identity(): FunctionMetadata {
    const source: Function = this.source;

    return {
      name: source.name,
      type: Types.Function,
      length: source.length,
    };
  }
}
