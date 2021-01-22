"use strict";
exports.__esModule = true;
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.getAgeFromBirth = function (birthDateString) {
        var t = new Date();
        var b = new Date(birthDateString);
        var m = t.getMonth() - b.getMonth();
        var a = t.getFullYear() - b.getFullYear();
        return m < 0 || (m === 0 && t.getDate() < b.getDate()) ? a-- : a;
    };
    return Utils;
}());
exports["default"] = Utils;
