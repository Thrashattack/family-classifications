"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var winston_1 = __importDefault(require("winston"));
var logger_1 = __importDefault(require("../../config/logger"));
var logger = winston_1["default"].createLogger(logger_1["default"].config.winston);
logger.on("throw", function (msg) {
    throw new Error(msg);
});
exports["default"] = logger;
