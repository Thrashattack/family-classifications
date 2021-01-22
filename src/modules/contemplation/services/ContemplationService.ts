import { Classification } from '@common-types/Classification';
import IService from '@shared/core/IService';

export default class ContemplationService
  implements IService<Classification, void> {
  execute(request?: Classification): void | Promise<void> {
    if (request)
      throw new Error(
        `Method not implemented. ${request.totalScore.toString()}`,
      );
  }
}
