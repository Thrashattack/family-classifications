import { Classification, Score } from '@common-types/Classification';
import IProvider from '@shared/core/IProvider';

export default class ClassificationProvider
  implements IProvider<Score, Classification> {
  provide(score: Score): Classification {
    const { familyId } = score;

    const selectionDate = new Date().toISOString();

    let criteriaAttended = Object.keys(score.scores).length;

    let totalScore = 0;

    for (const value of Object.values(score.scores))
      value === 0 ? criteriaAttended-- : (totalScore += value);

    const classification: Classification = {
      criteriaAttended,
      familyId,
      selectionDate,
      totalScore,
    };

    if (!classification)
      throw new Error(
        "Couldn't calculate the classification in the family body",
      );

    return classification;
  }
}
