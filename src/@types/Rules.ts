export type RuleValueType = number;

export type RuleFn = (n: RuleValueType) => RuleValueType;

export type Rule = Map<string, RuleFn>;

export type Rules = Map<string, Rule>;
