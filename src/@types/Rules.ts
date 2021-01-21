export type RuleValueType = number;

export type RuleFn = (n: RuleValueType) => boolean;

export type RuleDescription = Map<RulesDescriptions, RuleValue>;

export type RuleValue = RuleValueType | RuleFn;

export type Rule = Map<RulesLevels, RuleDescription>;

export type Rules = Map<string, Rule>;

export enum RuleCriterias {
  'age',
  'dependents',
  'inbounds',
}
export enum RulesLevels {
  'max',
  'med',
  'min',
  'defaults',
}
export enum RulesDescriptions {
  'score',
  'rule',
}
