import { Router } from 'express';

import ClassificationController from '@modules/classification/infra/http/controllers/ClassificationController';

import ensureAuthentication from '@shared/infra/http/middlewares/ensureAuthentication';

export default Router()
  .use(ensureAuthentication)
  .post('/classification', new ClassificationController().post);
