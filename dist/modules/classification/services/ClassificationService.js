"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MapFamilyToScoreService_1 = __importDefault(require("./MapFamilyToScoreService"));
const MapScoreToClassifiedService_1 = __importDefault(require("./MapScoreToClassifiedService"));
class ClassificationService {
    constructor() {
        this.mapFamilyToScoreService = new MapFamilyToScoreService_1.default();
        this.mapScoreToClassifiedService = new MapScoreToClassifiedService_1.default();
    }
    execute(request) {
        if (!request) {
            throw new Error('Family body is incorrect for Pontuation Service');
        }
        const scores = request.map((family) => this.mapFamilyToScoreService.execute(family));
        return scores.map((score) => this.mapScoreToClassifiedService.execute(score));
    }
}
exports.default = ClassificationService;
