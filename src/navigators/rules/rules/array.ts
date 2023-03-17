import type { Navigator } from '../../interfaces';
import { ArrayNavigator } from '../../navigators';
import { NavigatorRuleBase } from '../base';

/**
 * @description Rule that identifies arrays and provides the Array Navigator
 *
 * @export
 * @class ArrayNavigatorRule
 * @extends {NavigatorRuleBase<T[]>}
 * @template T
 */
export class ArrayNavigatorRule<T> extends NavigatorRuleBase<T[]> {
  shouldNavigate(): boolean {
    return Array.isArray(this.options.source);
  }

  getNavigator(): Navigator<T[]> {
    return new ArrayNavigator<T>(this.options);
  }
}
