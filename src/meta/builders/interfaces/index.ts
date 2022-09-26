import type { Metadata } from '../../../interfaces';

export interface SourceRule<M extends Metadata> {
  canIdentify(): boolean;
  identity(): M;
}

export interface SourceRuleConstruct<M extends Metadata> {
  new (source: any): SourceRule<M>;
}
