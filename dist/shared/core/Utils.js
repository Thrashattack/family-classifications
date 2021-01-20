"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    static getAgeFromBirth(birthDateString) {
        const t = new Date();
        const b = new Date(birthDateString);
        const m = t.getMonth() - b.getMonth();
        let a = t.getFullYear() - b.getFullYear();
        return (m < 0 || (m === 0 && t.getDate() < b.getDate())) ? a-- : a;
    }
}
exports.default = Utils;
Utils.between = (num, greaterThan, andLesserOrEqual) => num > greaterThan && num <= andLesserOrEqual;
