"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
            const index = jsonwebtoken_1.default.sign(key, process.env.APP_SECRET);
            return JSON.parse(this.pool[index]);
        }
        catch (err) {
            return null;
        }
    }
    set(value) {
        try {
            const index = jsonwebtoken_1.default.sign(value, process.env.APP_SECRET);
            const entry = JSON.stringify(value);
            return this.pool[index] = entry;
        }
        catch (err) {
            return null;
        }
    }
}
exports.default = Cache;
