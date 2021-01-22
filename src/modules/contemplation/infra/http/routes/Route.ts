import { Router } from 'express';

import ContemplationController from '@modules/contemplation/infra/http/controllers/ContemplationController';

import ensureAuthentication from '@shared/infra/http/middlewares/ensureAuthentication';

export default Router()
  .use(ensureAuthentication)
  .post('/contemplate', new ContemplationController().post);
