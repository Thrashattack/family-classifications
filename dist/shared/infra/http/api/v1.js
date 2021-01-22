"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var Route_1 = __importDefault(require("../../../../modules/classification/infra/http/routes/Route"));
var Route_2 = __importDefault(require("../../../../modules/contemplation/infra/http/routes/Route"));
var Route_3 = __importDefault(require("../../../../modules/authentication/infra/http/routes/Route"));
var v1Router = express_1.Router();
v1Router.use('/auth', Route_3["default"]);
v1Router.use('/classification', Route_1["default"]);
v1Router.use('/contemplation', Route_2["default"]);
exports["default"] = v1Router;
