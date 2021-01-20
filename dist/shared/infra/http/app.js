"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const v1_1 = __importDefault(require("./api/v1"));
const app = express_1.default();
app.use(express_1.default.json({
    limit: '100MB',
}), cors_1.default({
    exposedHeaders: ['X-maybe-a-cache-header', 'X-and-a-balancer-one'],
}), v1_1.default);
exports.default = app;
