import {
  Rule,
  RuleValue,
  Rules,
  RuleDescription,
  RuleDescriptionType,
  RuleValueType,
  RuleFn,
  RulesServices,
} from '@common-types/Rules';
import { stdProperty } from '@common-types/Basics';
import IService from '@shared/core/IService';
import { rulesConfig } from '@config/rules';

export default class RulesService implements IService<string, Rule> {
  private rules: Rules = new Map<string, Rule>();

  constructor() {
    for (const ruleName in RulesServices) {
      const ruleConfig = rulesConfig[ruleName];

      if (!ruleConfig)
        throw new Error("Couldn't load the rule configuration file");

      const max: RuleDescription = new Map<RuleDescriptionType, RuleValue>();
      const med: RuleDescription = new Map<RuleDescriptionType, RuleValue>();
      const min: RuleDescription = new Map<RuleDescriptionType, RuleValue>();
      const defaults: RuleDescription = new Map<
        RuleDescriptionType,
        RuleValue
      >();

      const [maxScore, maxRuleFn] = this.ruleValueProvider(ruleConfig.max);
      const [medScore, medRuleFn] = this.ruleValueProvider(ruleConfig.med);
      const [minScore, minRuleFn] = this.ruleValueProvider(ruleConfig.min);
      const [defaultsScore, defaultsRuleFn] = this.ruleValueProvider(
        ruleConfig.defaults,
      );

      max.set('score', maxScore);
      med.set('score', medScore);
      min.set('score', minScore);
      defaults.set('score', defaultsScore);

      max.set('rule', maxRuleFn);
      med.set('rule', medRuleFn);
      min.set('rule', minRuleFn);
      defaults.set('rule', defaultsRuleFn);

      const rule: Rule = { max, med, min, defaults };

      this.rules.set(ruleName, rule);
    }
  }

  ruleValueProvider(
    description: Record<string, number | stdProperty>,
  ): [RuleValueType, RuleFn] {
    const score = description.score as number;
    const ruleA = (description.rule as stdProperty).a;
    const ruleB = (description.rule as stdProperty).b;

    const ruleFunction = (n: number): boolean => n >= ruleA && n < ruleB;

    if (!score || !ruleFunction)
      throw new Error('Rule Descriptiion for Score failed');

    return [score, ruleFunction];
  }

  execute(request: string): Rule {
    const rule: Rule | undefined = this.rules.get(request);

    if (!rule) throw new Error('Couldnt load the provided rule');

    return rule;
  }
}
