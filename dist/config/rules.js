"use strict";
exports.__esModule = true;
exports.RulesCriterias = exports.RulesLevels = void 0;
exports.RulesLevels = eval(process.env.RULES_LEVELS);
exports.RulesCriterias = eval(process.env.RULES_CRITERIAS);
var rulesConfig = {};
for (var _i = 0, RulesCriterias_1 = exports.RulesCriterias; _i < RulesCriterias_1.length; _i++) {
    var ruleCriteria = RulesCriterias_1[_i];
    var criteria = ruleCriteria.toUpperCase();
    rulesConfig[ruleCriteria] = {};
    for (var _a = 0, RulesLevels_1 = exports.RulesLevels; _a < RulesLevels_1.length; _a++) {
        var ruleLevels = RulesLevels_1[_a];
        var level = ruleLevels.toUpperCase();
        var rule = {
            a: Number(process.env[criteria + "_" + level + "_RULE_A"]) || 0,
            b: Number(process.env[criteria + "_" + level + "_RULE_B"]) || 0
        };
        var score = Number(process.env[criteria + "_" + level + "_SCORE"]) || 0;
        rulesConfig[ruleCriteria][ruleLevels] = { score: score, rule: rule };
    }
}
exports["default"] = rulesConfig;
