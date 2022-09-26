import type { Navigator } from '../../interfaces';

export interface NavigatorRule<T> {
  shouldNavigate(): boolean;
  getNavigator(): Navigator<T | T[]>;
}

export interface NavigatorRuleConstruct<T> {
  new (source: T): NavigatorRule<T>;
}
