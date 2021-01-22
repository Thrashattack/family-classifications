"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var auth_1 = __importDefault(require("../../config/auth"));
var Cache = /** @class */ (function () {
    function Cache() {
        this.pool = {};
    }
    Cache.prototype.getFromCache = function (key) {
        try {
            var index = jsonwebtoken_1["default"].sign(JSON.stringify(key), auth_1["default"].secret);
            return JSON.parse(Buffer.from(this.pool[index]).toString('utf8'));
        }
        catch (err) {
            return null;
        }
    };
    Cache.prototype.setInCache = function (key, value) {
        try {
            var index = jsonwebtoken_1["default"].sign(JSON.stringify(key), auth_1["default"].secret);
            var entry = JSON.stringify(value);
            this.pool[index] = Buffer.from(entry);
        }
        catch (err) {
            return null;
        }
    };
    Cache.getInstance = function () {
        if (!Cache.instance) {
            Cache.instance = new Cache();
        }
        return Cache.instance;
    };
    return Cache;
}());
exports["default"] = Cache;
