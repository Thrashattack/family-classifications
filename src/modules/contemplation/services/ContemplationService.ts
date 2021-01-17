import { Contempled } from '@shared/@types/types';
import Service from '@shared/core/Service';

export default class ClassificationService
  implements Service<Contempled, void> {
  execute(request?: Contempled): void | Promise<void> {
    if (request)
      throw new Error(
        `Method not implemented. ${request.totalScore.toString()}`,
      );
  }
}
