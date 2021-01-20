import { Rule, stdProperty, RuleValue, RuleLevel } from '@common-types/types';
import IService from '@shared/core/IService';
import { rulesConfig } from '@config/rules';
import { RulesServices } from '@common-types/enums';

export default class RulesService implements IService<string, RuleLevel> {
  private ruleScope: Record<string, RuleLevel> = {};

  constructor() {
    for (const ruleName in RulesServices) {
      const ruleConfig = rulesConfig[ruleName];

      if (!ruleConfig)
        throw new Error("Couldn't load the rule configuration file");

      const max: Rule = new Map<string, RuleValue>();
      max.set('score', ruleConfig.max.score as number);
      max.set('rule', (n: number): boolean => {
        return (
          n >= (ruleConfig.max.rule as stdProperty).a &&
          n < (ruleConfig.max.rule as stdProperty).b
        );
      });

      const med: Rule = new Map<string, RuleValue>();
      med.set('score', ruleConfig.med.score as number);
      med.set('rule', (n: number): boolean => {
        return (
          n >= (ruleConfig.med.rule as stdProperty).a &&
          n < (ruleConfig.med.rule as stdProperty).b
        );
      });

      const min: Rule = new Map<string, RuleValue>();
      min.set('score', ruleConfig.min.score as number);
      min.set('rule', (n: number): boolean => {
        return (
          n >= (ruleConfig.min.rule as stdProperty).a &&
          n < (ruleConfig.min.rule as stdProperty).b
        );
      });

      const defaults: Rule = new Map<string, RuleValue>();
      defaults.set('score', ruleConfig.default.score as number);
      defaults.set('rule', (n: number): boolean => {
        return (
          n >= (ruleConfig.default.rule as stdProperty).a &&
          n < (ruleConfig.default.rule as stdProperty).b
        );
      });

      const level: RuleLevel = { max, med, min, defaults };

      this.ruleScope[ruleName] = level;
    }
  }

  execute(request: string): RuleLevel {
    const level: RuleLevel | undefined = this.ruleScope[request];

    if (!level) throw new Error('Couldnt load the provided rule');

    return level;
  }
}
