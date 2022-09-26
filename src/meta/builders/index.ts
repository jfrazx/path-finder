import type { SourceRuleConstruct } from './interfaces';
import type { Metadata } from '../../interfaces';
import {
  ConstructorIdentifier,
  PrimitiveIdentifier,
  FunctionIdentifier,
  WeakMapIdentifier,
  WeakSetIdentifier,
  ObjectIdentifier,
  ArrayIdentifier,
  NullIdentifier,
  MapIdentifier,
  SetIdentifier,
} from './rules';

export abstract class SourceIdentifier {
  static identify(source: any): Metadata {
    const rules: SourceRuleConstruct<any>[] = [
      FunctionIdentifier,
      WeakMapIdentifier,
      WeakSetIdentifier,
      ObjectIdentifier,
      ArrayIdentifier,
      NullIdentifier,
      MapIdentifier,
      SetIdentifier,
      ConstructorIdentifier,
      PrimitiveIdentifier,
    ];

    return rules
      .map((Rule) => new Rule(source))
      .find((rule) => rule.canIdentify())
      .identity();
  }
}
