"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TokenExpiredError {
    constructor(message, data, statusCode = 501) {
        this.message = message;
        this.statusCode = statusCode;
        if (data) {
            this.data = data;
        }
    }
}
exports.default = TokenExpiredError;
