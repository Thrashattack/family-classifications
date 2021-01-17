import express from 'express';

import ClassificationService from '@modules/classification/services/ClassificationService';
import PontuationService from '@modules/classification/services/PontuationService';

import { Family } from '@shared/@types/types';
import ensureAuthentication from '@shared/infra/http/middlewares/ensureAuthentication';

const classificationRouter = express.Router();

classificationRouter.use(ensureAuthentication);

classificationRouter.post(
  '/classify',
  async (req, res): Promise<void> => {
    try {
      const families = req.body as Family[];

      const pontuationResult = await new PontuationService().execute(families);

      const classificationResult = await new ClassificationService().execute(
        pontuationResult,
      );

      res.json(classificationResult);
    } catch (error) {
      res.json(new Error('Internal Server Error'));
    }
  },
);

export default classificationRouter;
