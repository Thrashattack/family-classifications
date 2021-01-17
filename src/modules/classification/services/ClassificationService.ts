import { Contempled, Score } from '@shared/@types/types';
import Service from '@shared/core/Service';

export default class ClassificationService
  implements Service<Score[], Contempled[]> {
  execute(request?: Score[]): Contempled[] | Promise<Contempled[]> {
    if (!request) {
      throw new Error('Score is missing on Classificator');
    }
    return request.map((score: Score) => {
      let criteriaAttended = 3;

      score.totalProposerScore === 0 ? criteriaAttended-- : 0;
      score.totalInboundScore === 0 ? criteriaAttended-- : 0;
      score.totalDependentsScore === 0 ? criteriaAttended-- : 0;

      const selectionDate = new Date().toISOString();

      const totalScore = score.totalDependentsScore;
      score.totalInboundScore + score.totalProposerScore;

      const { familyId } = score;

      return {
        criteriaAttended,
        familyId,
        selectionDate,
        totalScore,
      } as Contempled;
    });
  }
}
