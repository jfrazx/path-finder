import { ObjectNavigator } from '../../navigators';
import type { Navigator } from '../../interfaces';
import { NavigationRule } from '../base';

/**
 * @description Rule that identifies objects and provides the Object Navigator
 *
 * @export
 * @class ObjectNavigatorRule
 * @extends {NavigationRule<T>}
 * @template T
 */
export class ObjectNavigatorRule<T extends object> extends NavigationRule<T> {
  shouldNavigate(): boolean {
    return (
      typeof this.source === 'object' && Boolean(this.source) && !Array.isArray(this.source)
    );
  }

  getNavigator(): Navigator<T> {
    return new ObjectNavigator(this.options);
  }
}
