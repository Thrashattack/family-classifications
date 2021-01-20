import { FamilyMember } from '@shared/@types/enums';
import { Family, FamilyInfo, Inbound, People } from '@shared/@types/types';

import IService from '@shared/core/IService';
import Utils from '@shared/infra/singletons/Utils';

export default class GetFamilyInfoService
  implements IService<Family, FamilyInfo> {
  execute(request: Family): FamilyInfo {
    const proposer: People = request.peoples.filter(
      (people: People) =>
        FamilyMember[people.type] === FamilyMember.Pretendente,
    )[0];

    const age: number = Utils.getAgeFromBirth(proposer.birthDate);

    const inbounds = request.inbounds.reduce(
      (sum: number, inbound: Inbound) => sum + inbound.value,
      0,
    );

    const dependents = request.peoples.filter((dependent: People) => {
      const dependentAge = Utils.getAgeFromBirth(dependent.birthDate);
      return dependentAge < 18;
    });

    return { age, inbounds, dependents: dependents.length };
  }
}
