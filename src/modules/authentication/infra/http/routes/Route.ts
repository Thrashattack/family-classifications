import { Router } from 'express';

import AuthenticationController from '@modules/authentication/infra/http/controllers/AuthenticationController';

export default Router()
  .post('/auth', new AuthenticationController().post)
  .put('/auth', new AuthenticationController().put);
