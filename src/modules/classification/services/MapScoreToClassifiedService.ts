import { Classified, Score } from '@shared/@types/types';
import ICachedService from '@shared/core/ICachedService';
import IService from '@shared/core/IService';
import Cache from '@shared/infra/singletons/Cache';

export default class MapScoreToClassifiedService
  implements IService<Score, Classified>, ICachedService<Score, Classified> {
  setInCache(key: Score, value: Classified): void | null {
    return Cache.getInstance<Score, Classified>().set(key, value);
  }

  getFromCache(key: Score): Classified | null {
    return Cache.getInstance<Score, Classified>().get(key);
  }
  execute(request: Score): Classified {
    const classifiedFromCache = this.getFromCache(request);

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

    this.setInCache(request, classified);

    return classified;
  }
}
