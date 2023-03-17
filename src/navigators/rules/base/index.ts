import type { NavigatorOptions } from '../../../interfaces';
import type { NavigatorRule } from '../interfaces';
import type { Navigator } from '../../interfaces';

export abstract class NavigatorRuleBase<T> implements NavigatorRule<T> {
  constructor(protected readonly options: NavigatorOptions<T>) {}

  abstract shouldNavigate(): boolean;
  abstract getNavigator(): Navigator<T | T[]>;

  protected get source(): T {
    return this.options.source;
  }
}
