"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var bcrypt_1 = __importDefault(require("bcrypt"));
var auth_1 = __importDefault(require("../../../../config/auth"));
var PasswordProvider = /** @class */ (function () {
    function PasswordProvider() {
    }
    PasswordProvider.prototype.provide = function (password) {
        return bcrypt_1["default"].hashSync(password, auth_1["default"].salt);
    };
    return PasswordProvider;
}());
exports["default"] = PasswordProvider;
