import { RulesServices, RuleFn, Rule } from '@common-types/Rules';
import { PontuationServiceType } from '@common-types/Classification';
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

    const choosenRule: Rule = this.rulesService.execute(
      RulesServices[targetRule],
    );

    if (!choosenRule)
      throw new Error("Couldn't get the rules for this score category");

    let points = 0;

    for (const [, description] of Object.entries(choosenRule))
      if ((description.get('rule') as RuleFn)(value))
        points = description.get('score') as number;

    return points;
  }
}
