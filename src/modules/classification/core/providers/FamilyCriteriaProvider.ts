import { stdProperty } from '@common-types/Basics';
import { FamilyMember, Family, Inbound, People } from '@common-types/Family';

import IProvider from '@shared/core/IProvider';
import Utils from '@shared/singletons/Utils';

export default class FamilyInfoProvider
  implements IProvider<Family, stdProperty> {
  provide(family: Family): stdProperty {
    const proposer: People = family.peoples.filter(
      (people: People) => people.type === FamilyMember.Proposer,
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
      const isDependent = dependent.type === FamilyMember.Dependent;

      return dependentAge < 18 && isDependent;
    });

    return { age, inbounds, dependents: dependents.length };
  }
}
