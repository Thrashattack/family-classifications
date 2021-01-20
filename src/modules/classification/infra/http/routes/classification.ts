import express from 'express';

import ClassificationService from '@modules/classification/services/ClassificationService';

import { Family } from '@shared/@types/types';
import ensureAuthentication from '@shared/infra/http/middlewares/ensureAuthentication';

const classificationRouter = express.Router();

classificationRouter.use(ensureAuthentication);

classificationRouter.post(
  '/classify',
  async (req, res): Promise<void> => {
    try {
      const families = req.body as Family[];

      const classificationResult = await new ClassificationService().execute(
        families,
      );

      res.json(classificationResult);
    } catch (error) {
      res.json({ error: (error as Error).message });
    }
  },
);

export default classificationRouter;
