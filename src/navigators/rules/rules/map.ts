import type { Navigator } from '../../interfaces';
import { MapNavigator } from '../../navigators';
import { NavigatorRuleBase } from '../base';

/**
 * @description Rule that identifies maps and provides the Map Navigator
 *
 * @export
 * @class MapNavigatorRule
 * @extends {NavigatorRuleBase<Map<any, T>>}
 * @template T
 */
export class MapNavigatorRule<T> extends NavigatorRuleBase<Map<any, T>> {
  shouldNavigate(): boolean {
    return this.options.source instanceof Map;
  }

  getNavigator(): Navigator<Map<any, T>> {
    return new MapNavigator<T>(this.options);
  }
}
