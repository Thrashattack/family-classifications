"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rules_1 = __importDefault(require("@shared/core/Rules"));
const Utils_1 = __importDefault(require("@shared/core/Utils"));
class PontuationService extends Rules_1.default {
    constructor() {
        super();
        this.serviceLocator = [
            this.age,
            this.inbound,
            this.dependents
        ];
    }
    execute(request) {
        if (!request) {
            throw new Error('Numbers are incorrect for Pontuation Service');
        }
        return this.serviceLocator[request.type](request.value);
    }
    age(age) {
        if (Utils_1.default.between(age, -1, super.rules.age.min))
            return super.scores.age.min;
        else if (Utils_1.default.between(age, super.rules.age.min, super.rules.age.max))
            return super.scores.age.med;
        else
            return super.scores.age.max;
    }
    inbound(inbounds) {
        if (Utils_1.default.between(inbounds, -1, super.rules.inbound.min))
            return super.scores.inbound.max;
        else if (Utils_1.default.between(inbounds, super.rules.inbound.min, super.rules.inbound.med))
            return super.scores.inbound.med;
        else if (Utils_1.default.between(inbounds, super.rules.inbound.med, super.rules.inbound.max))
            return super.scores.inbound.min;
        else
            return 0;
    }
    dependents(dependents) {
        if (Utils_1.default.between(dependents, -1, super.rules.dependents.min))
            return 0;
        else if (Utils_1.default.between(dependents, super.rules.dependents.min, super.rules.dependents.max))
            return super.scores.dependents.min;
        else
            return super.scores.dependents.max;
    }
}
exports.default = PontuationService;
PontuationService.AGE = 0;
PontuationService.INBOUND = 1;
PontuationService.DEPENDENTS = 2;
