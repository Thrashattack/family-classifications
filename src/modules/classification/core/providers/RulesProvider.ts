import { Rule, Rules, RuleFn, RuleValueType } from '@common-types/Rules';
import { stdProperty } from '@common-types/Basics';
import IProvider from '@shared/core/IProvider';
import rulesConfig from '@config/rules';
import { RulesCriterias, RulesLevels } from '@config/rules';

export default class RulesService implements IProvider<void, Rules> {
  private rules: Rules = new Map<string, Rule>();

  ruleFnProvider(
    description: Record<string, RuleValueType | stdProperty>,
  ): RuleFn {
    const score = description.score as RuleValueType;
    const rule = description.rule as stdProperty;

    const ruleFunction = (value: RuleValueType): RuleValueType =>
      value >= rule.a && value < rule.b ? score : 0;

    if (!ruleFunction) throw new Error("Couldn't load the rule level");

    return ruleFunction;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  provide(request: void): Rules {
    for (const criteria of RulesCriterias) {      
      if (!rulesConfig[criteria])
        throw new Error("Couldn't load the rule criteria");

      const rule: Rule = new Map<string, RuleFn>();

      for (const level of RulesLevels) {        
        rule.set(level, this.ruleFnProvider(rulesConfig[criteria][level]));
      }

      this.rules.set(criteria, rule);

      if (rule.size === 0)
        throw new Error("Couldn't load any rule from the authConfig");
    }

    return this.rules;
  }
}
