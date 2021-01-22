"use strict";
exports.__esModule = true;
var ClassificationProvider = /** @class */ (function () {
    function ClassificationProvider() {
    }
    ClassificationProvider.prototype.provide = function (score) {
        var familyId = score.familyId;
        var selectionDate = new Date().toISOString();
        var criteriaAttended = Object.keys(score.scores).length;
        var totalScore = 0;
        for (var _i = 0, _a = Object.values(score.scores); _i < _a.length; _i++) {
            var value = _a[_i];
            value === 0 ? criteriaAttended-- : (totalScore += value);
        }
        var classification = {
            criteriaAttended: criteriaAttended,
            familyId: familyId,
            selectionDate: selectionDate,
            totalScore: totalScore
        };
        if (!classification)
            throw new Error("Couldn't calculate the classification in the family body");
        return classification;
    };
    return ClassificationProvider;
}());
exports["default"] = ClassificationProvider;
