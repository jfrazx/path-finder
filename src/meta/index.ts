import { MetaContent, Metadata } from '../interfaces';
import { SourceIdentifier } from './builders';

export abstract class Meta<T> {
  constructor(protected readonly options: MetaContent<T>) {}

  protected meta(source = this.options.source): Metadata {
    const identity = SourceIdentifier.identify(source);

    return {
      ...identity,
    };
  }
}
