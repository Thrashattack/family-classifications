"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../../../config/auth"));
class Cache {
    constructor() {
        this.pool = {};
    }
    static getInstance() {
        if (!Cache.instance) {
            Cache.instance = new Cache();
        }
        return Cache.instance;
    }
    get(key) {
        try {
            const index = jsonwebtoken_1.default.sign(JSON.stringify(key), auth_1.default.secret);
            return JSON.parse(this.pool[index]);
        }
        catch (err) {
            return null;
        }
    }
    set(key, value) {
        try {
            const index = jsonwebtoken_1.default.sign(JSON.stringify(key), auth_1.default.secret);
            const entry = JSON.stringify(value);
            this.pool[index] = entry;
        }
        catch (err) {
            return null;
        }
    }
}
exports.default = Cache;
