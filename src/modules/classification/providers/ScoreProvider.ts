import { ScoreProviderType } from '@common-types/Classification';
import {
  RuleDescription,
  RuleFn,
  RulesDescriptions,
} from '@common-types/Rules';
import IProvider from '@shared/core/IProvider';

export default class ScoreProvider
  implements IProvider<ScoreProviderType, number> {
  provide({ targetRule, value }: ScoreProviderType): number {
    for (const [, description] of Object.entries(targetRule)) {
      const ruleDescrition = description as RuleDescription;
      const ruleFunction = ruleDescrition.get(RulesDescriptions.rule) as RuleFn;
      const ruleScore = ruleDescrition.get(RulesDescriptions.score) as number;

      if (ruleFunction(value)) return ruleScore;
    }

    throw new Error("Seems that this rule doesn't applies to this value");
  }
}
