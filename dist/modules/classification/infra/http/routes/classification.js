"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ClassificationService_1 = __importDefault(require("../../../services/ClassificationService"));
const ensureAuthentication_1 = __importDefault(require("../../../../../shared/infra/http/middlewares/ensureAuthentication"));
const classificationRouter = express_1.default.Router();
classificationRouter.use(ensureAuthentication_1.default);
classificationRouter.post('/classify', async (req, res) => {
    try {
        const families = req.body;
        const classificationResult = await new ClassificationService_1.default().execute(families);
        res.json(classificationResult);
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.default = classificationRouter;
