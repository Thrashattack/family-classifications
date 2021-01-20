"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../../@types/enums");
const Utils_1 = __importDefault(require("../../../shared/singletons/Utils"));
class GetFamilyInfoService {
    execute(request) {
        const proposer = request.peoples.filter((people) => enums_1.FamilyMember[people.type] === enums_1.FamilyMember.Pretendente)[0];
        if (!proposer)
            throw new Error('No proposer was found in the family body');
        const age = Utils_1.default.getAgeFromBirth(proposer.birthDate);
        if (!age)
            throw new Error("Couldn't calculate the age of the proposer");
        const inbounds = request.inbounds.reduce((sum, inbound) => sum + inbound.value, 0);
        if (!inbounds)
            throw new Error('No inbound was found in the family body');
        const dependents = request.peoples.filter((dependent) => {
            const dependentAge = Utils_1.default.getAgeFromBirth(dependent.birthDate);
            return dependentAge < 18;
        });
        if (!dependents)
            throw new Error("Couldn't get the dependents in the family body");
        return { age, inbounds, dependents: dependents.length };
    }
}
exports.default = GetFamilyInfoService;
