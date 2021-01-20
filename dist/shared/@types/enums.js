"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyMember = exports.FamilyStatus = void 0;
var FamilyStatus;
(function (FamilyStatus) {
    FamilyStatus[FamilyStatus["Valid Registration"] = 0] = "Valid Registration";
    FamilyStatus[FamilyStatus["Already have a house"] = 1] = "Already have a house";
    FamilyStatus[FamilyStatus["Already contempled in another selecion"] = 2] = "Already contempled in another selecion";
    FamilyStatus[FamilyStatus["Incompleteregistration"] = 3] = "Incompleteregistration";
})(FamilyStatus = exports.FamilyStatus || (exports.FamilyStatus = {}));
var FamilyMember;
(function (FamilyMember) {
    FamilyMember[FamilyMember["Pretendente"] = 0] = "Pretendente";
    FamilyMember[FamilyMember["C\u00F4njugue"] = 1] = "C\u00F4njugue";
    FamilyMember[FamilyMember["Dependente"] = 2] = "Dependente";
})(FamilyMember = exports.FamilyMember || (exports.FamilyMember = {}));
