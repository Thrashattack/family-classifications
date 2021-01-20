"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cache_1 = __importDefault(require("../../../shared/singletons/Cache"));
class MapScoreToClassifiedService {
    setInCache(key, value) {
        return Cache_1.default.getInstance().set(key, value);
    }
    getFromCache(key) {
        return Cache_1.default.getInstance().get(key);
    }
    execute(request) {
        const classifiedFromCache = this.getFromCache(request);
        if (classifiedFromCache)
            return classifiedFromCache;
        const { familyId } = request;
        const selectionDate = new Date().toISOString();
        let criteriaAttended = Object.keys(request.scores).length;
        let totalScore = 0;
        for (const value of Object.values(request.scores))
            value === 0 ? criteriaAttended-- : (totalScore += value);
        const classified = {
            criteriaAttended,
            familyId,
            selectionDate,
            totalScore,
        };
        if (!classified)
            throw new Error("Couldn't calculate the classification in the family body");
        this.setInCache(request, classified);
        return classified;
    }
}
exports.default = MapScoreToClassifiedService;
