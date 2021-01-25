import ClassificationProvider from '@modules/classification/core/providers/ClassificationProvider';
import FamilyCriteriaProvider from '@modules/classification/core/providers/FamilyCriteriaProvider';
import RulesProvider from '@modules/classification/core/providers/RulesProvider';

import IService from '@shared/core/IService';

import { Score, Classification } from '@common-types/Classification';
import { Family } from '@common-types/Family';
import { stdProperty } from '@common-types/Basics';

import { RulesLevels, RulesCriterias } from '@config/rules';

import SingletonCache from '@shared/singletons/Cache';

export default class ClassificationService
  implements IService<Family, Classification | Promise<Classification>> {
  private ClassificationProvider: ClassificationProvider;
  private FamilyCriteriaProvider: FamilyCriteriaProvider;
  private RulesProvider: RulesProvider;
  private FamilyCache: SingletonCache<string, Family>;
  private ClassificationCache: SingletonCache<string, Classification>;

  constructor() {
    this.ClassificationProvider = new ClassificationProvider();
    this.FamilyCriteriaProvider = new FamilyCriteriaProvider();
    this.RulesProvider = new RulesProvider();

    this.FamilyCache = SingletonCache.getInstance();
    this.ClassificationCache = SingletonCache.getInstance();
  }

  execute(family: Family): Classification | Promise<Classification> {
    
    const familyFromCache = this.FamilyCache.getFromCache(
      family.id,
    ) as Family;

    if (familyFromCache === family)
      return this.ClassificationCache.getFromCache(
        family.id,
      ) as Classification;    

    const familyCriteria = this.FamilyCriteriaProvider.provide(family);

    const rules = this.RulesProvider.provide();

    const scores: stdProperty = {};

    for (const criteria of RulesCriterias) {
      scores[criteria] = 0;

      const rule = rules.get(criteria);

      if (!rule) throw new Error(`Can't get rule for this criteria`);

      for (const level of RulesLevels) {
        const fn = rule.get(level);

        if (!fn)
          throw new Error(
            "Classification Function isn't defined for this rule",
          );
        scores[criteria] += fn(familyCriteria[criteria]);
      }
    }

    const score: Score = {
      familyId: family.id,
      scores: scores,
    };

    const classification = this.ClassificationProvider.provide(score);

    if (!classification) throw new Error("Couldn't classify this family");

    this.FamilyCache.setInCache(family.id, family);

    this.ClassificationCache.setInCache(family.id, classification);

    return classification;
    
  }
}
