"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cache_1 = __importDefault(require("@modules/contemplation/infra/singletons/Cache"));
const enums_1 = require("@shared/@types/enums");
const Utils_1 = __importDefault(require("@shared/core/Utils"));
const PontuationService_1 = __importDefault(require("./PontuationService"));
class ClassificationService {
    setInCache(value) {
        return Cache_1.default.getInstance().set(value);
    }
    getFromCache(key) {
        return Cache_1.default.getInstance().get(key);
    }
    execute(request) {
        if (!request) {
            throw new Error('Family body is incorrect for Pontuation Service');
        }
        const pontuationService = new PontuationService_1.default();
        const scores = request.map((family) => {
            const scoreFromCache = this.getFromCache(family);
            if (scoreFromCache)
                return scoreFromCache;
            const { age, inbounds, dependents } = this.getFamilyInfo(family);
            const score = {
                familyId: family.id,
                scores: {
                    proposerAgeScore: pontuationService.execute({ type: PontuationService_1.default.AGE, value: age }),
                    inboundScore: pontuationService.execute({ type: PontuationService_1.default.INBOUND, value: inbounds }),
                    dependentsScore: pontuationService.execute({ type: PontuationService_1.default.DEPENDENTS, value: dependents }),
                }
            };
            this.setInCache(family);
            return score;
        });
        const classifieds = scores.map((score) => {
            const classifiedFromCache = this.getFromCache(score);
            if (classifiedFromCache)
                return classifiedFromCache;
            const { familyId } = score;
            const selectionDate = new Date().toISOString();
            let criteriaAttended = Object.keys(score.scores).length;
            let totalScore = 0;
            for (const value of Object.values(score.scores))
                value === 0 ? criteriaAttended-- : totalScore += value;
            const classified = {
                criteriaAttended,
                familyId,
                selectionDate,
                totalScore,
            };
            this.setInCache(classified);
            return classified;
        });
        return classifieds;
    }
    getFamilyInfo(family) {
        const proposer = family.peoples.filter((people) => enums_1.FamilyMember[people.type] === enums_1.FamilyMember.Pretendente)[0];
        const age = Utils_1.default.getAgeFromBirth(proposer.birthDate);
        const inbounds = family.inbounds.reduce((sum, inbound) => sum + inbound.value, 0);
        const dependents = family.peoples.filter((dependent) => {
            const dependentAge = Utils_1.default.getAgeFromBirth(dependent.birthDate);
            return dependentAge < 18;
        });
        return { age, inbounds, dependents: dependents.length };
    }
}
exports.default = ClassificationService;
