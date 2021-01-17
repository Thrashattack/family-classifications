import express from 'express';

import ContemplationService from '@modules/contemplation/services/ContemplationService';

import { Contempled } from '@shared/@types/types';
import ensureAuthentication from '@shared/infra/http/middlewares/ensureAuthentication';

const contemplationRouter = express.Router();

contemplationRouter.use(ensureAuthentication);

contemplationRouter.post(
  '/classify',
  async (req, res): Promise<void> => {
    try {
      const contempled = req.body as Contempled;

      const contempledResult = await new ContemplationService().execute(
        contempled,
      );

      res.json(contempledResult);
    } catch (error) {
      res.json(new Error('Internal Server Error'));
    }
  },
);

export default contemplationRouter;
