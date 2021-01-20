import express from 'express';

import ContemplationService from '@modules/contemplation/services/ContemplationService';

import { Classified } from '@common-types/Basics';
import ensureAuthentication from '@shared/infra/http/middlewares/ensureAuthentication';

const contemplationRouter = express.Router();

contemplationRouter.use(ensureAuthentication);

contemplationRouter.post(
  '/contemplate',
  async (req, res): Promise<void> => {
    try {
      const classified = req.body as Classified;

      const contemplationResult = await new ContemplationService().execute(
        classified,
      );

      res.json(contemplationResult);
    } catch (error) {
      res.json({ error: (error as Error).message });
    }
  },
);

export default contemplationRouter;
