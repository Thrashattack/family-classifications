"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var auth_1 = __importDefault(require("../../../../config/auth"));
function ensureAuthenticated(req, res, next) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Auth Token is Missing' });
    }
    var _a = authHeader.split(' '), token = _a[1];
    try {
        var user = jsonwebtoken_1["default"].verify(token, auth_1["default"].secret);
        req.app.set('username', user.login);
        return next();
    }
    catch (_b) {
        return res.status(401).json({ error: 'Invalid Auth Token' });
    }
}
exports["default"] = ensureAuthenticated;
