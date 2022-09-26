import { PrimitiveNavigator } from '../../navigators';
import type { Navigator } from '../../interfaces';
import { NavigatorRuleBase } from '../base';

export class PrimitiveNavigatorRule<T> extends NavigatorRuleBase<T> {
  shouldNavigate(): boolean {
    return true;
  }

  getNavigator(): Navigator<T> {
    return new PrimitiveNavigator(this.options);
  }
}
