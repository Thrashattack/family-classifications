"use strict";
exports.__esModule = true;
exports.FamilyMember = exports.FamilyStatus = void 0;
var FamilyStatus;
(function (FamilyStatus) {
    FamilyStatus[FamilyStatus["Valid_Registration"] = 0] = "Valid_Registration";
    FamilyStatus[FamilyStatus["Already_have_a_house"] = 1] = "Already_have_a_house";
    FamilyStatus[FamilyStatus["Already_contempled_in_another_selecion"] = 2] = "Already_contempled_in_another_selecion";
    FamilyStatus[FamilyStatus["Incomplete_registration"] = 3] = "Incomplete_registration";
})(FamilyStatus = exports.FamilyStatus || (exports.FamilyStatus = {}));
var FamilyMember;
(function (FamilyMember) {
    FamilyMember[FamilyMember["Proposer"] = 0] = "Proposer";
    FamilyMember[FamilyMember["Conjugate"] = 1] = "Conjugate";
    FamilyMember[FamilyMember["Dependent"] = 2] = "Dependent";
})(FamilyMember = exports.FamilyMember || (exports.FamilyMember = {}));
