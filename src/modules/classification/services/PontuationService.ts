import { RulesServices } from '@common-types/enums';
import { RuleFn, PontuationServiceType, RuleLevel } from '@common-types/types';
import IService from '@shared/core/IService';
import RulesService from './RulesService';

export default class PontuationService
  implements IService<PontuationServiceType, number> {
  private rulesService: RulesService;
  constructor() {
    this.rulesService = new RulesService();
  }
  execute(request: PontuationServiceType): number {
    const { targetRule, value } = request;

    const choosenRule: RuleLevel = this.rulesService.execute(
      RulesServices[targetRule],
    );

    if (!choosenRule)
      throw new Error("Couldn't get the rules for this score category");

    let points = 0;

    for (const [, rule] of Object.entries(choosenRule))
      if ((rule.get('rule') as RuleFn)(value))
        points = rule.get('score') as number;

    return points;
  }
}
