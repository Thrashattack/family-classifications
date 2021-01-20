import { RuleFn, PontuationServiceType } from '@shared/@types/types';
import IService from '@shared/core/IService';
import RulesService from './RulesService';

export default class PontuationService
  implements IService<PontuationServiceType, number> {
  execute(request: PontuationServiceType): number {
    const { rule, value } = request;

    const rulesService = new RulesService().execute(rule);

    let score = 0;

    for (const [, level] of rulesService)
      if ((level.rule as RuleFn)(value)) score = level.score as number;

    return score;
  }
}
