export type stdClass = Record<string, unknown>;

export type stdProperty = Record<string, number>;

export type FamilyMemberType = 'Pretendente' | 'Cônjugue' | 'Dependente';

export type FamilyStatusType = 0 | 1 | 2 | 3 | '0' | '1' | '2' | '3';

export type RuleFn = (n: number) => boolean;

export type RuleValue = number | RuleFn;

export type RuleLevel = {
  max: Rule;
  med: Rule;
  min: Rule;
  defaults: Rule;
};
export type RuleScope = Map<string, RuleLevel>;

export type Rule = Map<string, RuleValue>;

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

export type PontuationServiceType = {
  targetRule: 0 | 1 | 2;
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
