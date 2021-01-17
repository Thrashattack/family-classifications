import { FamilyMember } from '@shared/@types/enums';
import { Score, Family, People, Inbound } from '@shared/@types/types';
import Service from '@shared/core/Service';

export default class PontuationService implements Service<Family[], Score[]> {
  public static AgeRules: Record<string, number> = {
    MAX_AGE: 45,
    MED_AGE: 30,
    MIN_AGE: 18,
  };

  public static InboundRules: Record<string, number> = {
    MAX_RENDA: 2000.0,
    MED_RENDA: 1500.0,
    MIN_RENDA: 900.0,
  };

  public static DependentsRules = { MAX_dependents: 3, MIN_dependents: 1 };

  public static VariationRules: Record<string, number> = {
    IDADE: 1,
    RENDA: 2,
    DEPENDENTES: 1,
  };

  public static PontuationRules: Record<string, number> = {
    IDADE: 3,
    RENDA: 5,
    DEPENDENTES: 3,
  };

  private static getDependentAge(birthDate: string): number {
    return birthDate.length;
  }

  execute(request?: Family[]): Score[] | Promise<Score[]> {
    if (!request) {
      throw new Error('Family body is incorrect for Pontuation Service');
    }
    return request.map((family: Family) => {
      const proposer: People = family.peoples.filter(
        (people: People) => people.type === FamilyMember[0],
      )[0];

      const proposerAge: number = PontuationService.getDependentAge(
        proposer.birthDate,
      );

      const totalInbounds = family.inbounds.reduce(
        (sum: number, inbound: Inbound) => sum + inbound.value,
        0,
      );

      const dependents = family.peoples.filter((dependent: People) => {
        const dependentAge = PontuationService.getDependentAge(
          dependent.birthDate,
        );
        return dependentAge < PontuationService.AgeRules.MIN_AGE;
      });

      const totalProposerScore: number =
        proposerAge >= PontuationService.AgeRules.MAX_AGE
          ? PontuationService.PontuationRules.IDADE
          : proposerAge >= PontuationService.AgeRules.MED_AGE
          ? PontuationService.PontuationRules.IDADE -
            PontuationService.VariationRules.IDADE
          : proposerAge >= PontuationService.AgeRules.MIN_AGE
          ? PontuationService.PontuationRules.IDADE -
            PontuationService.VariationRules.IDADE * 2
          : 0;

      const totalInboundScore: number =
        totalInbounds <= PontuationService.InboundRules.MIN_RENDA
          ? PontuationService.PontuationRules.RENDA
          : totalInbounds <= PontuationService.InboundRules.MED_RENDA
          ? PontuationService.PontuationRules.RENDA -
            PontuationService.VariationRules.RENDA
          : totalInbounds <= PontuationService.InboundRules.MAX_RENDA
          ? PontuationService.PontuationRules.RENDA -
            PontuationService.VariationRules.RENDA * 2
          : 0;

      const totalDependentsScore: number =
        dependents.length >= PontuationService.DependentsRules.MAX_dependents
          ? PontuationService.PontuationRules.DEPENDENTES
          : dependents.length >=
            PontuationService.DependentsRules.MIN_dependents
          ? PontuationService.PontuationRules.DEPENDENTES -
            PontuationService.VariationRules.DEPENDENTES
          : 0;

      return {
        familyId: family.id,
        totalProposerScore,
        totalInboundScore,
        totalDependentsScore,
      } as Score;
    });
  }
}
