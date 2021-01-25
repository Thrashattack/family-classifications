import { stdProperty } from '@common-types/Basics';
export const RulesLevels = eval(
  process.env.RULES_LEVELS as string,
) as Array<string>;
export const RulesCriterias = eval(
  process.env.RULES_CRITERIAS as string,
) as Array<string>;

const rulesConfig: Record<
  string,
  Record<string, Record<string, number | stdProperty>>
> = {};

for (const ruleCriteria of RulesCriterias) {
  const criteria = ruleCriteria.toUpperCase();
  rulesConfig[ruleCriteria] = {};
  for (const ruleLevels of RulesLevels) {

    const level = ruleLevels.toUpperCase();

    const rule: stdProperty = {
      a: Number(process.env[`${criteria}_${level}_RULE_A`]) || 0,
      b: Number(process.env[`${criteria}_${level}_RULE_B`]) || 0,
    };

    const score = Number(process.env[`${criteria}_${level}_SCORE`]) || 0;

    rulesConfig[ruleCriteria][ruleLevels] = { score, rule };
  }
}
export default rulesConfig;
