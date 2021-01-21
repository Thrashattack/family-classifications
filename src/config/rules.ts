import { stdProperty } from '@common-types/Basics';
import { RuleCriterias } from '@common-types/Rules';

const rulesConfig: Record<
  string,
  Record<string, Record<string, number | stdProperty>>
> = {};

for (const ruleCriteria in RuleCriterias) {
  rulesConfig[ruleCriteria] = {
    max: {
      score: Number(process.env[`${ruleCriteria.toUpperCase()}_MAX_SCORE`]) || 0,
      rule: {
        a: Number(process.env[`${ruleCriteria.toUpperCase()}_MAX_RULE_A`]) || 0,
        b: Number(process.env[`${ruleCriteria.toUpperCase()}_MAX_RULE_B`]) || 0,
      },
    },
    med: {
      score: Number(process.env[`${ruleCriteria.toUpperCase()}_MED_SCORE`]) || 0,
      rule: {
        a: Number(process.env[`${ruleCriteria.toUpperCase()}_MED_RULE_A`]) || 0,
        b: Number(process.env[`${ruleCriteria.toUpperCase()}_MED_RULE_B`]) || 0,
      },
    },
    min: {
      score: Number(process.env[`${ruleCriteria.toUpperCase()}_MIN_SCORE`]) || 0,
      rule: {
        a: Number(process.env[`${ruleCriteria.toUpperCase()}_MIN_RULE_A`]) || 0,
        b: Number(process.env[`${ruleCriteria.toUpperCase()}_MIN_RULE_B`]) || 0,
      },
    },
    default: {
      score:
        Number(process.env[`${ruleCriteria.toUpperCase()}_DEFAULT_SCORE`]) || 0,
      rule: {
        a: Number(process.env[`${ruleCriteria.toUpperCase()}_DEFAULT_RULE_A`]) || 0,
        b: Number(process.env[`${ruleCriteria.toUpperCase()}_DEFAULT_RULE_B`]) || 0,
      },
    },
  };
}
export { rulesConfig };
