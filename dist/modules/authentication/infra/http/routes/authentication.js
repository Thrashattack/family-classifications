"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SignInService_1 = __importDefault(require("../../../services/SignInService"));
const SignUpService_1 = __importDefault(require("../../../services/SignUpService"));
const authenticationRouter = express_1.default.Router();
authenticationRouter.post('/signin', async (req, res) => {
    try {
        const user = req.body;
        const signInResult = await new SignInService_1.default().execute(user);
        res.json(signInResult);
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
authenticationRouter.post('/signup', async (req, res) => {
    try {
        const user = req.body;
        const signUpResult = await new SignUpService_1.default().execute(user);
        res.json(signUpResult);
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.default = authenticationRouter;
