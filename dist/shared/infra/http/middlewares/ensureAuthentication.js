"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("@config/auth"));
const TokenExpiredError_1 = __importDefault(require("@shared/errors/TokenExpiredError"));
function ensureAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new Error('JWT token is missing.');
    }
    const [, token] = authHeader.split(' ');
    try {
        jsonwebtoken_1.default.verify(token, auth_1.default.secret);
        return next();
    }
    catch (_a) {
        throw new TokenExpiredError_1.default('Invalid Auth Token');
    }
}
exports.default = ensureAuthenticated;
