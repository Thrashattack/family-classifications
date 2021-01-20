import {
  FamilyMember,
  Family,
  FamilyInfo,
  Inbound,
  People,
} from '@common-types/Family';

import IService from '@shared/core/IService';
import Utils from '@shared/singletons/Utils';

export default class GetFamilyInfoService
  implements IService<Family, FamilyInfo> {
  execute(request: Family): FamilyInfo {
    const proposer: People = request.peoples.filter(
      (people: People) =>
        FamilyMember[people.type] === FamilyMember.Pretendente,
    )[0];

    if (!proposer) throw new Error('No proposer was found in the family body');

    const age: number = Utils.getAgeFromBirth(proposer.birthDate);

    if (!age) throw new Error("Couldn't calculate the age of the proposer");

    const inbounds = request.inbounds.reduce(
      (sum: number, inbound: Inbound) => sum + inbound.value,
      0,
    );

    if (!inbounds) throw new Error('No inbound was found in the family body');

    const dependents = request.peoples.filter((dependent: People) => {
      const dependentAge = Utils.getAgeFromBirth(dependent.birthDate);
      return dependentAge < 18;
    });

    if (!dependents)
      throw new Error("Couldn't get the dependents in the family body");

    return { age, inbounds, dependents: dependents.length };
  }
}
