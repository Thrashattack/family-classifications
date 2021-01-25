import { Family, FamilyStatus } from '@common-types/Family';
import IAdapter from '@shared/core/IAdapter';

export default class FamilyAdapter implements IAdapter<Family> {
  validate(body: unknown): Family {
    const family = body as Family;

    if (!family) {
      throw new Error('Family body is incorrect');
    }

    if (!family.id) {
      throw new Error('Family id must be a string');
    }

    if (!family.peoples) {
      throw new Error('Family peoples must be an array');
    }

    if (!family.inbounds) {
      throw new Error('Family inbounds must be an array');
    }

    if (family.status !== FamilyStatus.Valid_Registration)
      throw new Error('Invalid Registration: ' + FamilyStatus[family.status]);

    return family;
  }
}
