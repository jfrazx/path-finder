import { Metadata } from '../../../interfaces';
import { SourceIdentification } from '../base';
import { Types } from '../constants';

export interface MapMetadata extends Metadata {
  readonly keys: string[];
  readonly size: number;
}

export class MapIdentifier extends SourceIdentification<MapMetadata> {
  canIdentify(): boolean {
    return this.source instanceof Map;
  }

  identity(): MapMetadata {
    const keys = this.mapKeys();

    return {
      keys,
      type: Types.Map,
      size: this.source.size,
    };
  }

  private mapKeys(): string[] {
    const map: Map<any, any> = this.source;

    return [...map.keys()].map((key: any) => String(key));
  }
}
