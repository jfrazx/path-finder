import { Metadata } from '../../../interfaces';
import { SourceIdentification } from '../base';
import { Types } from '../constants';

export interface MapMetadata extends Metadata {
  size: number;
  keys: string[];
}

export class MapIdentifier extends SourceIdentification<MapMetadata> {
  canIdentify(): boolean {
    return this.source instanceof Map;
  }

  identity(): MapMetadata {
    const keys = [...(this.source as Map<any, any>).keys()].map((key: any) => String(key));

    return {
      keys,
      type: Types.Map,
      size: this.source.size,
    };
  }
}
