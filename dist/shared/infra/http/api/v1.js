"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const classification_1 = __importDefault(require("../../../../modules/classification/infra/http/routes/classification"));
const contemplation_1 = __importDefault(require("../../../../modules/contemplation/infra/http/routes/contemplation"));
const authentication_1 = __importDefault(require("../../../../modules/authentication/infra/http/routes/authentication"));
const v1Router = express_1.Router();
v1Router.use('/auth', authentication_1.default);
v1Router.use('/classification', classification_1.default);
v1Router.use('/contemplation', contemplation_1.default);
exports.default = v1Router;
