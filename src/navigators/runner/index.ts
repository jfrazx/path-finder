import { ArrayNavigatorRule, ObjectNavigatorRule, PrimitiveNavigatorRule } from '../rules';
import type { NavigatorRuleConstruct, NavigatorRule } from '../rules';
import type { NavigatorOptions } from '../../interfaces';
import type { Navigator } from '../interfaces';

export abstract class NavigatorRunner {
  private static rules: NavigatorRuleConstruct<any>[] = [
    ArrayNavigatorRule,
    ObjectNavigatorRule,
    PrimitiveNavigatorRule,
  ];

  static for<T = any>(options: NavigatorOptions<T>): Navigator<T> {
    const navigator: NavigatorRule<any> = this.rules
      .map((Rule: NavigatorRuleConstruct<any>) => new Rule(options))
      .find((rule: NavigatorRule<any>) => rule.shouldNavigate()) as NavigatorRule<any>;

    return navigator.getNavigator();
  }

  /**
   * @description Set rules for navigation providers
   *
   * @note Existing rules are lost
   *
   * @static
   * @param {NavigatorRuleConstruct<any>[]} rules
   * @memberof NavigatorRunner
   */
  static setRules(rules: NavigatorRuleConstruct<any>[]): void {
    this.rules = rules;
  }

  /**
   * @description Add a navigator rule to the beginning of existing rules
   *
   * @static
   * @param {NavigatorRuleConstruct<any>} rule
   * @memberof NavigatorRunner
   */
  static addRule(rule: NavigatorRuleConstruct<any>): void {
    this.addRules([rule]);
  }

  /**
   * @description Add more navigator rules to the beginning of existing rules
   *
   * @static
   * @param {NavigatorRuleConstruct<any>[]} rules
   * @memberof NavigatorRunner
   */
  static addRules(rules: NavigatorRuleConstruct<any>[]): void {
    this.rules.unshift(...rules);
  }
}
