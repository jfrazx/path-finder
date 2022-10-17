import { ArrayNavigatorRule, ObjectNavigatorRule, PrimitiveNavigatorRule } from './rules';
import type { NavigatorRuleConstruct } from './interfaces';
import type { NavigatorOptions } from '../../interfaces';
import type { Navigator } from '../interfaces';

export abstract class NavigatorRunner {
  static for<T = any>(options: NavigatorOptions<T>): Navigator<T> {
    const rules: NavigatorRuleConstruct<any>[] = [
      ArrayNavigatorRule,
      ObjectNavigatorRule,
      PrimitiveNavigatorRule,
    ];

    return rules
      .map((Rule) => new Rule(options))
      .find((rule) => rule.shouldNavigate())
      .getNavigator();
  }
}
