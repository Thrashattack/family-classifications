import ScoreProvider from '@modules/classification/providers/ScoreProvider';
import ClassificationProvider from '@modules/classification/providers/ClassificationProvider';
import FamilyInfoProvider from '@modules/classification/providers/FamilyInfoProvider';
import RulesProvider from '@modules/classification/providers/RulesProvider';

import IService from '@shared/core/IService';
import IProvider from '@shared/core/IProvider';

import {
  Score,
  Classified,
  ScoreProviderType,
} from '@common-types/Classification';
import { Family, FamilyInfo } from '@common-types/Family';
import { Rule, RuleCriterias } from '@common-types/Rules';

export default class ClassificationService
  implements IService<Family[], Classified[] | Promise<Classified[]>> {
  private ScoreProvider: IProvider<ScoreProviderType, number>;
  private ClassificationProvider: IProvider<Score, Classified>;
  private FamilyInfoProvider: IProvider<Family, FamilyInfo>;
  private RulesProvider: IProvider<number, Rule>;

  constructor() {
    this.ScoreProvider = new ScoreProvider();
    this.ClassificationProvider = new ClassificationProvider();
    this.FamilyInfoProvider = new FamilyInfoProvider();
    this.RulesProvider = new RulesProvider();
  }
  execute(families: Family[]): Classified[] | Promise<Classified[]> {
    if (!families) {
      throw new Error('Family body is incorrect for Pontuation Service');
    }

    return families.map((family: Family) => {
      const familyInfo = this.FamilyInfoProvider.provide(family) as FamilyInfo;

      const ageRule = this.RulesProvider.provide(RuleCriterias.age) as Rule;

      const inboundsRule = this.RulesProvider.provide(
        RuleCriterias.inbounds,
      ) as Rule;

      const dependentsRule = this.RulesProvider.provide(
        RuleCriterias.dependents,
      ) as Rule;

      const proposerAgeScore = this.ScoreProvider.provide({
        targetRule: ageRule,
        value: familyInfo.age,
      }) as number;

      const inboundScore = this.ScoreProvider.provide({
        targetRule: inboundsRule,
        value: familyInfo.inbounds,
      }) as number;

      const dependentsScore = this.ScoreProvider.provide({
        targetRule: dependentsRule,
        value: familyInfo.dependents,
      }) as number;

      const score: Score = {
        familyId: familyInfo.id,
        scores: {
          proposerAgeScore,
          inboundScore,
          dependentsScore,
        },
      };

      const classification = this.ClassificationProvider.provide(
        score,
      ) as Classified;

      if (!classification) throw new Error("Couldn't classify this family");

      return classification;
    });
  }
}
