export type Contempled = {
  familyId: string;
  criteriaAttended: number;
  totalScore: number;
  selectionDate: string;
};

export type Score = {
  familyId: string;
  totalDependentsScore: number;
  totalProposerScore: number;
  totalInboundScore: number;
};

export type FamilyMemberType = 'Pretendente' | 'Cônjugue' | 'Dependente';

export type FamilyStatusType = 0 | 1 | 2 | 3 | '0' | '1' | '2' | '3';

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
