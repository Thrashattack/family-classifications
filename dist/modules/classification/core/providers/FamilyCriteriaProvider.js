"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Family_1 = require("../../../../@types/Family");
var Utils_1 = __importDefault(require("../../../../shared/singletons/Utils"));
var FamilyInfoProvider = /** @class */ (function () {
    function FamilyInfoProvider() {
    }
    FamilyInfoProvider.prototype.provide = function (family) {
        var proposer = family.peoples.filter(function (people) { return people.type === Family_1.FamilyMember.Proposer; })[0];
        if (!proposer)
            throw new Error('No proposer was found in the family body');
        var age = Utils_1["default"].getAgeFromBirth(proposer.birthDate);
        if (!age)
            throw new Error("Couldn't calculate the age of the proposer");
        var inbounds = family.inbounds.reduce(function (sum, inbound) { return sum + inbound.value; }, 0);
        var dependents = family.peoples.filter(function (dependent) {
            var dependentAge = Utils_1["default"].getAgeFromBirth(dependent.birthDate);
            var isDependent = dependent.type === Family_1.FamilyMember.Dependent;
            return dependentAge < 18 && isDependent;
        });
        return { age: age, inbounds: inbounds, dependents: dependents.length };
    };
    return FamilyInfoProvider;
}());
exports["default"] = FamilyInfoProvider;
