import { Rule } from '@shared/@types/types';

export default interface IRules {
  readonly age: Rule;

  readonly inbound: Rule;

  readonly dependents: Rule;
}
