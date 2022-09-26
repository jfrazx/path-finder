import type { Metadata } from '../../../interfaces';
import { SourceIdentification } from '../base';
import { Types } from '../constants';

export interface ObjectMetadata extends Metadata {
  properties: string[];
}

export class ObjectIdentifier<
  T extends ObjectMetadata = ObjectMetadata,
> extends SourceIdentification<T> {
  canIdentify(): boolean {
    return this.isObject() && !this.hasConstructor();
  }

  identity(): T {
    return {
      type: Types.Object,
      properties: Object.keys(this.source),
    } as T;
  }

  protected get className(): string | undefined {
    return this.source?.constructor?.name;
  }

  protected hasConstructor(): boolean {
    return Boolean(this.className);
  }

  protected isObject(): boolean {
    return (
      Boolean(this.source) &&
      !Array.isArray(this.source) &&
      typeof this.source === Types.Object
    );
  }
}
