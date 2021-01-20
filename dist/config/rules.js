"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rulesConfig = void 0;
const enums_1 = require("../@types/enums");
const rulesConfig = {};
exports.rulesConfig = rulesConfig;
for (const ruleName in enums_1.RulesServices) {
    rulesConfig[ruleName] = {
        max: {
            score: Number(process.env[`${ruleName.toUpperCase()}_MAX_SCORE`]) || 0,
            rule: {
                a: Number(process.env[`${ruleName.toUpperCase()}_MAX_RULE_A`]) || 0,
                b: Number(process.env[`${ruleName.toUpperCase()}_MAX_RULE_B`]) || 0,
            },
        },
        med: {
            score: Number(process.env[`${ruleName.toUpperCase()}_MED_SCORE`]) || 0,
            rule: {
                a: Number(process.env[`${ruleName.toUpperCase()}_MED_RULE_A`]) || 0,
                b: Number(process.env[`${ruleName.toUpperCase()}_MED_RULE_B`]) || 0,
            },
        },
        min: {
            score: Number(process.env[`${ruleName.toUpperCase()}_MIN_SCORE`]) || 0,
            rule: {
                a: Number(process.env[`${ruleName.toUpperCase()}_MIN_RULE_A`]) || 0,
                b: Number(process.env[`${ruleName.toUpperCase()}_MIN_RULE_B`]) || 0,
            },
        },
        default: {
            score: Number(process.env[`${ruleName.toUpperCase()}_DEFAULT_SCORE`]) || 0,
            rule: {
                a: Number(process.env[`${ruleName.toUpperCase()}_DEFAULT_RULE_A`]) || 0,
                b: Number(process.env[`${ruleName.toUpperCase()}_DEFAULT_RULE_B`]) || 0,
            },
        },
    };
}
