import { ObjectNavigator } from '../../navigators';
import type { Navigator } from '../../interfaces';
import { NavigatorRuleBase } from '../base';

export class ObjectNavigatorRule<T extends object> extends NavigatorRuleBase<T> {
  shouldNavigate(): boolean {
    return (
      typeof this.source === 'object' && Boolean(this.source) && !Array.isArray(this.source)
    );
  }

  getNavigator(): Navigator<T> {
    return new ObjectNavigator(this.options);
  }
}
