import { PrimitiveNavigator } from '../../navigators';
import type { Navigator } from '../../interfaces';
import { NavigatorRuleBase } from '../base';

/**
 * @description Rule that provides the Primitive Navigator
 *
 * @note Always returns true, should be final navigator
 *
 * @export
 * @class PrimitiveNavigatorRule
 * @extends {NavigatorRuleBase<T>}
 * @template T
 */
export class PrimitiveNavigatorRule<T> extends NavigatorRuleBase<T> {
  shouldNavigate(): boolean {
    return true;
  }

  getNavigator(): Navigator<T> {
    return new PrimitiveNavigator(this.options);
  }
}
