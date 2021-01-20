import { Classified } from '@common-types/types';
import IService from '@shared/core/IService';

export default class ContemplationService
  implements IService<Classified, void> {
  execute(request?: Classified): void | Promise<void> {
    if (request)
      throw new Error(
        `Method not implemented. ${request.totalScore.toString()}`,
      );
  }
}
