"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var rules_1 = __importDefault(require("../../../../config/rules"));
var rules_2 = require("../../../../config/rules");
var RulesService = /** @class */ (function () {
    function RulesService() {
        this.rules = new Map();
    }
    RulesService.prototype.ruleFnProvider = function (description) {
        var score = description.score;
        var rule = description.rule;
        var ruleFunction = function (value) {
            return value >= rule.a && value < rule.b ? score : 0;
        };
        if (!ruleFunction)
            throw new Error("Couldn't load the rule level");
        return ruleFunction;
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    RulesService.prototype.provide = function (request) {
        for (var _i = 0, RulesCriterias_1 = rules_2.RulesCriterias; _i < RulesCriterias_1.length; _i++) {
            var criteria = RulesCriterias_1[_i];
            if (!rules_1["default"][criteria])
                throw new Error("Couldn't load the rule criteria");
            var rule = new Map();
            for (var _a = 0, RulesLevels_1 = rules_2.RulesLevels; _a < RulesLevels_1.length; _a++) {
                var level = RulesLevels_1[_a];
                rule.set(level, this.ruleFnProvider(rules_1["default"][criteria][level]));
            }
            this.rules.set(criteria, rule);
            if (rule.size === 0)
                throw new Error("Couldn't load any rule from the authConfig");
        }
        return this.rules;
    };
    return RulesService;
}());
exports["default"] = RulesService;
