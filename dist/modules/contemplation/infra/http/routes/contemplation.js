"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ContemplationService_1 = __importDefault(require("../../../services/ContemplationService"));
const ensureAuthentication_1 = __importDefault(require("../../../../../shared/infra/http/middlewares/ensureAuthentication"));
const contemplationRouter = express_1.default.Router();
contemplationRouter.use(ensureAuthentication_1.default);
contemplationRouter.post('/contemplate', async (req, res) => {
    try {
        const classified = req.body;
        const contemplationResult = await new ContemplationService_1.default().execute(classified);
        res.json(contemplationResult);
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.default = contemplationRouter;
