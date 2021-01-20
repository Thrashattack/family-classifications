import { RulesServices } from '@shared/@types/enums';
import { Family, Score } from '@shared/@types/types';
import ICachedService from '@shared/core/ICachedService';
import IService from '@shared/core/IService';
import GetFamilyInfoService from './GetFamilyInfoService';
import PontuationService from './PontuationService';
import Cache from '@shared/infra/singletons/Cache';

export default class MapFamilyToScoreService
  implements IService<Family, Score>, ICachedService<Family, Score> {
  private getFamilyInfoService: GetFamilyInfoService;
  private pontuationService: PontuationService;

  constructor() {
    this.getFamilyInfoService = new GetFamilyInfoService();
    this.pontuationService = new PontuationService();
  }

  setInCache(key: Family, value: Score): void | null {
    return Cache.getInstance<Family, Score>().set(key, value);
  }

  getFromCache(key: Family): Score | null {
    return Cache.getInstance<Family, Score>().get(key);
  }

  execute(request: Family): Score {
    const scoreFromCache = this.getFromCache(request);

    if (scoreFromCache) return scoreFromCache;

    const { age, inbounds, dependents } = this.getFamilyInfoService.execute(
      request,
    );

    const score: Score = {
      familyId: request.id,
      scores: {
        proposerAgeScore: this.pontuationService.execute({
          rule: RulesServices.AGE,
          value: age,
        }),
        inboundScore: this.pontuationService.execute({
          rule: RulesServices.INBOUND,
          value: inbounds,
        }),
        dependentsScore: this.pontuationService.execute({
          rule: RulesServices.DEPENDENTS,
          value: dependents,
        }),
      },
    };

    this.setInCache(request, score);

    return score;
  }
}
