export type stdClass = Record<string, unknown>;

export type stdProperty = Record<string, number>;

export type FamilyMemberType = 'Pretendente' | 'Cônjugue' | 'Dependente';

export type FamilyStatusType = 0 | 1 | 2 | 3 | '0' | '1' | '2' | '3';

export type RuleFn = (n: number) => boolean;

export type RuleLevel = stdProperty | RuleFn;

export type RulesEntries = [string, Record<string, number | RuleFn>][];

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

export type FamilyInfo = {
  age: number;
  inbounds: number;
  dependents: number;
};

export type People = {
  id: string;
  name: string;
  type: FamilyMemberType;
  birthDate: string;
};

export type Inbound = {
  peopleId: string;
  value: number;
};

export type Family = {
  id: string;
  peoples: Array<People>;
  inbounds: Array<Inbound>;
  status: FamilyStatusType;
};

export type Rule = {
  max: RuleLevel;
  med: RuleLevel;
  min: RuleLevel;
  default: RuleLevel;
};

export type PontuationServiceType = {
  rule: 0 | 1 | 2;
  value: number;
};

export type User = {
  login: string;
  password: string;
};

export type Authentication = {
  token: string;
  expires: Date;
};
