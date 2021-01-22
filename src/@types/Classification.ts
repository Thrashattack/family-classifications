import { stdProperty } from './Basics';
import { Rule } from './Rules';

export type Classification = {
  familyId: string;
  criteriaAttended: number;
  totalScore: number;
  selectionDate: string;
};

export type Score = {
  familyId: string;
  scores: stdProperty;
};

export type ScoreProviderType = {
  targetRule: Rule;
  value: number;
};
