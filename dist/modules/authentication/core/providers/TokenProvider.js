"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var auth_1 = __importDefault(require("../../../../config/auth"));
var TokenProvider = /** @class */ (function () {
    function TokenProvider() {
    }
    TokenProvider.prototype.provide = function (user) {
        var secret = auth_1["default"].secret, expiresIn = auth_1["default"].expiresIn;
        return {
            token: jsonwebtoken_1["default"].sign({ login: user.login }, secret, { expiresIn: expiresIn }),
            expires: new Date(new Date().setDate(new Date().getDate() + Number(expiresIn.charAt(0))))
        };
    };
    return TokenProvider;
}());
exports["default"] = TokenProvider;
