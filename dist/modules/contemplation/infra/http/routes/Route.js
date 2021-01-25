"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var ContemplationController_1 = __importDefault(require("../controllers/ContemplationController"));
var ensureAuthentication_1 = __importDefault(require("../../../../../shared/infra/http/middlewares/ensureAuthentication"));
exports["default"] = express_1.Router()
    .use(ensureAuthentication_1["default"])
    .post('/contemplation', new ContemplationController_1["default"]().post);
