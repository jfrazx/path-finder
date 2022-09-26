import type { ContentWithSearchablePath } from '../../../interfaces';
import type { NavigatorOptions, Navigator } from '../../interfaces';
import type { NavigatorRule } from '../interfaces';

export abstract class NavigatorRuleBase<T> implements NavigatorRule<T> {
  constructor(protected readonly options: NavigatorOptions<T>) {}

  abstract shouldNavigate(): boolean;
  abstract getNavigator(): Navigator<T | T[]>;

  protected get source(): ContentWithSearchablePath<T> {
    return this.options.source;
  }
}
