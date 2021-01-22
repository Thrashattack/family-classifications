"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
require("express-async-errors");
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var v1_1 = __importDefault(require("./api/v1"));
var app = express_1["default"]();
app.use(express_1["default"].json({
    limit: '100MB'
}), cors_1["default"]({
    exposedHeaders: ['X-USE-CACHE']
}), v1_1["default"]);
exports["default"] = app;
