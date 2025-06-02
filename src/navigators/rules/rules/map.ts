import type { Navigator } from '../../interfaces';
import { MapNavigator } from '../../navigators';
import { NavigationRule } from '../base';

/**
 * @description Rule that identifies maps and provides the Map Navigator
 *
 * @export
 * @class MapNavigatorRule
 * @extends {NavigationRule<Map<any, T>>}
 * @template T
 */
export class MapNavigatorRule<T> extends NavigationRule<Map<any, T>> {
  shouldNavigate(): boolean {
    return this.options.source instanceof Map;
  }

  getNavigator(): Navigator<Map<any, T>> {
    return new MapNavigator<T>(this.options);
  }
}
