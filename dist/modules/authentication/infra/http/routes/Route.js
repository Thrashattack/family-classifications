"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var AuthenticationController_1 = __importDefault(require("../controllers/AuthenticationController"));
exports["default"] = express_1.Router()
    .post('/signin', new AuthenticationController_1["default"]().post)
    .put('/signup', new AuthenticationController_1["default"]().put);
