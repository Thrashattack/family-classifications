import {
  FamilyMember,
  Family,
  FamilyInfo,
  Inbound,
  People,
} from '@common-types/Family';

import IProvider from '@shared/core/IProvider';
import Utils from '@shared/singletons/Utils';

export default class FamilyInfoProvider
  implements IProvider<Family, FamilyInfo> {
  provide(family: Family): FamilyInfo {
    const proposer: People = family.peoples.filter(
      (people: People) => people.type === FamilyMember.Pretendente,
    )[0];

    if (!proposer) throw new Error('No proposer was found in the family body');

    const age = Utils.getAgeFromBirth(proposer.birthDate);

    if (!age) throw new Error("Couldn't calculate the age of the proposer");

    const inbounds = family.inbounds.reduce(
      (sum: number, inbound: Inbound) => sum + inbound.value,
      0,
    );

    const dependents = family.peoples.filter((dependent: People) => {
      const dependentAge = Utils.getAgeFromBirth(dependent.birthDate);
      return dependentAge < 18;
    });

    if (!dependents)
      throw new Error("Couldn't get the dependents in the family body");

    return { id: family.id, age, inbounds, dependents: dependents.length };
  }
}
