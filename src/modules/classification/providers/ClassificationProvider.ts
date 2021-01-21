import { Classified, Score } from '@common-types/Classification';
import ICache from '@shared/core/ICache';
import IProvider from '@shared/core/IProvider';
import SingletonCache from '@shared/singletons/Cache';

export default class ClassificationProvider
  implements IProvider<Score, Classified> {
  private cache: ICache<Score, Classified>;
  constructor() {
    this.cache = SingletonCache.getInstance<Score, Classified>();
  }
  provide(score: Score): Classified {
    const classifiedFromCache = this.cache.getFromCache(score);

    if (classifiedFromCache) return classifiedFromCache;

    const { familyId } = score;

    const selectionDate = new Date().toISOString();

    let criteriaAttended = Object.keys(score.scores).length;

    let totalScore = 0;

    for (const value of Object.values(score.scores))
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

    this.cache.setInCache(score, classified);

    return classified;
  }
}
