"use strict";
exports.__esModule = true;
var Family_1 = require("../../../../../@types/Family");
var FamilyAdapter = /** @class */ (function () {
    function FamilyAdapter() {
    }
    FamilyAdapter.prototype.validate = function (body) {
        var family = body;
        if (!family) {
            throw new Error('Family body is incorrect');
        }
        if (!family.id) {
            throw new Error("Family id must be a string");
        }
        if (!family.peoples) {
            throw new Error("Family peoples must be an array");
        }
        if (!family.inbounds) {
            throw new Error("Family inbounds must be an array");
        }
        if (family.status !== Family_1.FamilyStatus.Valid_Registration)
            throw new Error('Invalid Registration: ' + Family_1.FamilyStatus[family.status]);
        return family;
    };
    return FamilyAdapter;
}());
exports["default"] = FamilyAdapter;
