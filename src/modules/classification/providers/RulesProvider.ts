import {
  Rule,
  RuleValue,
  Rules,
  RuleDescription,
  RulesDescriptions,
  RuleValueType,
  RuleFn,
  RuleCriterias,
  RulesLevels,
} from '@common-types/Rules';
import { stdProperty } from '@common-types/Basics';
import IProvider from '@shared/core/IProvider';
import { rulesConfig } from '@config/rules';

export default class RulesService implements IProvider<number, Rule> {
  private rules: Rules = new Map<string, Rule>();

  constructor() {
    for (const ruleCriteria in RuleCriterias) {
      const ruleConfig = rulesConfig[ruleCriteria];

      if (!ruleConfig)
        throw new Error("Couldn't load the rule configuration file");

      const max: RuleDescription = new Map<RulesDescriptions, RuleValue>();
      const med: RuleDescription = new Map<RulesDescriptions, RuleValue>();
      const min: RuleDescription = new Map<RulesDescriptions, RuleValue>();
      const defaults: RuleDescription = new Map<RulesDescriptions, RuleValue>();

      const [maxScore, maxRuleFn] = this.ruleValueProvider(ruleConfig.max);
      const [medScore, medRuleFn] = this.ruleValueProvider(ruleConfig.med);
      const [minScore, minRuleFn] = this.ruleValueProvider(ruleConfig.min);
      const [defaultsScore, defaultsRuleFn] = this.ruleValueProvider(
        ruleConfig.defaults,
      );

      max.set(RulesDescriptions.score, maxScore);
      med.set(RulesDescriptions.score, medScore);
      min.set(RulesDescriptions.score, minScore);
      defaults.set(RulesDescriptions.score, defaultsScore);

      max.set(RulesDescriptions.rule, maxRuleFn);
      med.set(RulesDescriptions.rule, medRuleFn);
      min.set(RulesDescriptions.rule, minRuleFn);
      defaults.set(RulesDescriptions.rule, defaultsRuleFn);

      const rule = new Map<RulesLevels, RuleDescription>([
        [RulesLevels.max, max],
        [RulesLevels.med, med],
        [RulesLevels.min, min],
        [RulesLevels.defaults, defaults],
      ]);

      this.rules.set(ruleCriteria, rule);
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

  provide(criteria: number): Rule {
    const rule: Rule | undefined = this.rules.get(RuleCriterias[criteria]);

    if (!rule) throw new Error('Couldnt load the provided rule');

    return rule;
  }
}
