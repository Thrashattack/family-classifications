import { RulesServices } from '@common-types/enums';
import { Family, Score } from '@common-types/types';
import IService from '@shared/core/IService';
import GetFamilyInfoService from './GetFamilyInfoService';
import PontuationService from './PontuationService';
import Cache from '@shared/singletons/Cache';

export default class MapFamilyToScoreService
  implements IService<Family, Score> {
  private getFamilyInfoService: GetFamilyInfoService;
  private pontuationService: PontuationService;
  private cache: Cache<Family, Score>;

  constructor() {
    this.getFamilyInfoService = new GetFamilyInfoService();
    this.pontuationService = new PontuationService();
    this.cache = Cache.getInstance();
  }

  execute(request: Family): Score {
    const scoreFromCache = this.cache.getFromCache(request);

    if (scoreFromCache) return scoreFromCache;

    const { age, inbounds, dependents } = this.getFamilyInfoService.execute(
      request,
    );

    const score: Score = {
      familyId: request.id,
      scores: {
        proposerAgeScore: this.pontuationService.execute({
          targetRule: RulesServices.age,
          value: age,
        }),
        inboundScore: this.pontuationService.execute({
          targetRule: RulesServices.inbounds,
          value: inbounds,
        }),
        dependentsScore: this.pontuationService.execute({
          targetRule: RulesServices.dependents,
          value: dependents,
        }),
      },
    };

    if (!score)
      throw new Error("Couldn't calculate the score in the family body");

      this.cache.setInCache(request, score);

    return score;
  }
}
