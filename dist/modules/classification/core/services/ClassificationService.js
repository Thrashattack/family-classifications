"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var ClassificationProvider_1 = __importDefault(require("../providers/ClassificationProvider"));
var FamilyCriteriaProvider_1 = __importDefault(require("../providers/FamilyCriteriaProvider"));
var RulesProvider_1 = __importDefault(require("../providers/RulesProvider"));
var Family_1 = require("../../../../@types/Family");
var rules_1 = require("../../../../config/rules");
var Cache_1 = __importDefault(require("../../../../shared/singletons/Cache"));
var ClassificationService = /** @class */ (function () {
    function ClassificationService() {
        this.ClassificationProvider = new ClassificationProvider_1["default"]();
        this.FamilyCriteriaProvider = new FamilyCriteriaProvider_1["default"]();
        this.RulesProvider = new RulesProvider_1["default"]();
        this.FamilyCache = Cache_1["default"].getInstance();
        this.ClassificationCache = Cache_1["default"].getInstance();
    }
    ClassificationService.prototype.execute = function (families) {
        var _this = this;
        return families.map(function (family) {
            var familyFromCache = _this.FamilyCache.getFromCache(family.id);
            if (familyFromCache === family)
                return _this.ClassificationCache.getFromCache(family.id);
            if (family.status !== Family_1.FamilyStatus.Valid_Registration)
                throw new Error('Invalid Registration: ' + Family_1.FamilyStatus[family.status]);
            var familyCriteria = _this.FamilyCriteriaProvider.provide(family);
            var rules = _this.RulesProvider.provide();
            var scores = {};
            for (var _i = 0, RulesCriterias_1 = rules_1.RulesCriterias; _i < RulesCriterias_1.length; _i++) {
                var criteria = RulesCriterias_1[_i];
                if (!isNaN(Number(criteria)))
                    continue;
                scores[criteria] = 0;
                var rule = rules.get(criteria);
                if (!rule)
                    throw new Error("Can't get rule for this criteria");
                for (var _a = 0, RulesLevels_1 = rules_1.RulesLevels; _a < RulesLevels_1.length; _a++) {
                    var level = RulesLevels_1[_a];
                    if (!isNaN(Number(level)))
                        continue;
                    var fn = rule.get(level);
                    if (!fn)
                        throw new Error("Classification Function isn't defined for this rule");
                    scores[criteria] += fn(familyCriteria[criteria]);
                }
            }
            var score = {
                familyId: family.id,
                scores: scores
            };
            var classification = _this.ClassificationProvider.provide(score);
            if (!classification)
                throw new Error("Couldn't classify this family");
            _this.FamilyCache.setInCache(family.id, family);
            _this.ClassificationCache.setInCache(family.id, classification);
            return classification;
        });
    };
    return ClassificationService;
}());
exports["default"] = ClassificationService;
