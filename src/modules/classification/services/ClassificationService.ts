import { Score, Family, Classified } from '@common-types/types';

import IService from '@shared/core/IService';

import MapFamilyToScoreService from './MapFamilyToScoreService';
import MapScoreToClassifiedService from './MapScoreToClassifiedService';

export default class ClassificationService
  implements IService<Family[], Classified[]> {
  private mapFamilyToScoreService: MapFamilyToScoreService;
  private mapScoreToClassifiedService: MapScoreToClassifiedService;

  constructor() {
    this.mapFamilyToScoreService = new MapFamilyToScoreService();
    this.mapScoreToClassifiedService = new MapScoreToClassifiedService();
  }
  execute(request: Family[]): Classified[] | Promise<Classified[]> {
    if (!request) {
      throw new Error('Family body is incorrect for Pontuation Service');
    }

    const scores: Score[] = request.map((family: Family) =>
      this.mapFamilyToScoreService.execute(family),
    );

    return scores.map((score: Score) =>
      this.mapScoreToClassifiedService.execute(score),
    );
  }
}
