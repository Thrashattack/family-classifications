"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../../@types/enums");
const GetFamilyInfoService_1 = __importDefault(require("./GetFamilyInfoService"));
const PontuationService_1 = __importDefault(require("./PontuationService"));
const Cache_1 = __importDefault(require("../../../shared/singletons/Cache"));
class MapFamilyToScoreService {
    constructor() {
        this.getFamilyInfoService = new GetFamilyInfoService_1.default();
        this.pontuationService = new PontuationService_1.default();
    }
    setInCache(key, value) {
        return Cache_1.default.getInstance().set(key, value);
    }
    getFromCache(key) {
        return Cache_1.default.getInstance().get(key);
    }
    execute(request) {
        const scoreFromCache = this.getFromCache(request);
        if (scoreFromCache)
            return scoreFromCache;
        const { age, inbounds, dependents } = this.getFamilyInfoService.execute(request);
        const score = {
            familyId: request.id,
            scores: {
                proposerAgeScore: this.pontuationService.execute({
                    targetRule: enums_1.RulesServices.age,
                    value: age,
                }),
                inboundScore: this.pontuationService.execute({
                    targetRule: enums_1.RulesServices.inbounds,
                    value: inbounds,
                }),
                dependentsScore: this.pontuationService.execute({
                    targetRule: enums_1.RulesServices.dependents,
                    value: dependents,
                }),
            },
        };
        if (!score)
            throw new Error("Couldn't calculate the score in the family body");
        this.setInCache(request, score);
        return score;
    }
}
exports.default = MapFamilyToScoreService;
