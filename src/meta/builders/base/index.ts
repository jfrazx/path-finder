import type { Metadata } from '../../../interfaces';
import type { SourceRule } from '../interfaces';

export abstract class SourceIdentification<M extends Metadata> implements SourceRule<M> {
  constructor(protected source: any) {}

  abstract canIdentify(): boolean;
  abstract identity(): M;
}
