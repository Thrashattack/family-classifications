"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rules_1 = require("../../../config/rules");
const enums_1 = require("../../../@types/enums");
class RulesService {
    constructor() {
        this.ruleScope = {};
        for (const ruleName in enums_1.RulesServices) {
            const ruleConfig = rules_1.rulesConfig[ruleName];
            if (!ruleConfig)
                throw new Error("Couldn't load the rule configuration file");
            const max = new Map();
            max.set('score', ruleConfig.max.score);
            max.set('rule', (n) => {
                return (n >= ruleConfig.max.rule.a &&
                    n < ruleConfig.max.rule.b);
            });
            const med = new Map();
            med.set('score', ruleConfig.med.score);
            med.set('rule', (n) => {
                return (n >= ruleConfig.med.rule.a &&
                    n < ruleConfig.med.rule.b);
            });
            const min = new Map();
            min.set('score', ruleConfig.min.score);
            min.set('rule', (n) => {
                return (n >= ruleConfig.min.rule.a &&
                    n < ruleConfig.min.rule.b);
            });
            const defaults = new Map();
            defaults.set('score', ruleConfig.default.score);
            defaults.set('rule', (n) => {
                return (n >= ruleConfig.default.rule.a &&
                    n < ruleConfig.default.rule.b);
            });
            const level = { max, med, min, defaults };
            this.ruleScope[ruleName] = level;
        }
    }
    execute(request) {
        const level = this.ruleScope[request];
        if (!level)
            throw new Error('Couldnt load the provided rule');
        return level;
    }
}
exports.default = RulesService;
