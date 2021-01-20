import { Classified, Score } from '@common-types/Classification';
import ICache from '@shared/core/ICache';
import IService from '@shared/core/IService';
import SingletonCache from '@shared/singletons/Cache';

export default class MapScoreToClassifiedService
  implements IService<Score, Classified> {
  private cache: ICache<Score, Classified>;
  constructor() {
    this.cache = SingletonCache.getInstance<Score, Classified>();
  }
  execute(request: Score): Classified {
    const classifiedFromCache = this.cache.getFromCache(request);

    if (classifiedFromCache) return classifiedFromCache;

    const { familyId } = request;

    const selectionDate = new Date().toISOString();

    let criteriaAttended = Object.keys(request.scores).length;

    let totalScore = 0;

    for (const value of Object.values(request.scores))
      value === 0 ? criteriaAttended-- : (totalScore += value);

    const classified: Classified = {
      criteriaAttended,
      familyId,
      selectionDate,
      totalScore,
    };

    if (!classified)
      throw new Error(
        "Couldn't calculate the classification in the family body",
      );

    this.cache.setInCache(request, classified);

    return classified;
  }
}
