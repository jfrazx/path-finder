import type { SourceRuleConstruct, SourceRule } from '../builders';
import type { Metadata } from '../../interfaces';
import {
  PrimitiveIdentifier,
  FunctionIdentifier,
  WeakMapIdentifier,
  WeakSetIdentifier,
  ObjectIdentifier,
  ArrayIdentifier,
  ClassIdentifier,
  NullIdentifier,
  MapIdentifier,
  SetIdentifier,
} from '../builders';

export abstract class SourceIdentifier {
  private static rules: SourceRuleConstruct<any>[] = [
    FunctionIdentifier,
    WeakMapIdentifier,
    WeakSetIdentifier,
    ObjectIdentifier,
    ArrayIdentifier,
    NullIdentifier,
    MapIdentifier,
    SetIdentifier,
    ClassIdentifier,
    PrimitiveIdentifier,
  ];

  /**
   * @description Sets identifiers for source identification
   *
   * @note Existing identifiers are lost
   *
   * @static
   * @param {SourceRuleConstruct<any>[]} identifiers
   * @memberof SourceIdentifier
   */
  static setIdentifiers(identifiers: SourceRuleConstruct<any>[]): void {
    this.rules = identifiers;
  }

  /**
   * @description Add more identifiers to the beginning of existing identifiers set
   *
   * @static
   * @param {SourceRuleConstruct<any>[]} rules
   * @memberof SourceIdentifier
   */
  static addIdentifiers(rules: SourceRuleConstruct<any>[]): void {
    this.rules.unshift(...rules);
  }

  static identify<M extends Metadata>(source: any): M {
    const identifier: SourceRule<any> = this.rules
      .map((Rule: SourceRuleConstruct<any>) => new Rule(source))
      .find((rule: SourceRule<any>) => rule.canIdentify()) as SourceRule<any>;

    return identifier.identity();
  }
}
