export type People = {
  id: string;
  name: string;
  type: FamilyMember;
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
  status: FamilyStatus;
};

export enum FamilyStatus {
  'Valid_Registration',
  'Already_have_a_house',
  'Already_contempled_in_another_selecion',
  'Incomplete_registration',
}

export enum FamilyMember {
  'Proposer',
  'Conjugate',
  'Dependent',
}
