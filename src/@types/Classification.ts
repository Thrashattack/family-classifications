import { Rule } from './Rules';

export type Classified = {
  familyId: string;
  criteriaAttended: number;
  totalScore: number;
  selectionDate: string;
};

export type Score = {
  familyId: string;
  scores: {
    dependentsScore: number;
    proposerAgeScore: number;
    inboundScore: number;
  };
};

export type ScoreProviderType = {
  targetRule: Rule;
  value: number;
};
