"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../../@types/enums");
const RulesService_1 = __importDefault(require("./RulesService"));
class PontuationService {
    constructor() {
        this.rulesService = new RulesService_1.default();
    }
    execute(request) {
        const { targetRule, value } = request;
        const choosenRule = this.rulesService.execute(enums_1.RulesServices[targetRule]);
        if (!choosenRule)
            throw new Error("Couldn't get the rules for this score category");
        let points = 0;
        for (const [, rule] of Object.entries(choosenRule))
            if (rule.get('rule')(value))
                points = rule.get('score');
        return points;
    }
}
exports.default = PontuationService;
