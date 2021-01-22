import { Router } from 'express';

import AuthenticationController from '@modules/authentication/infra/http/controllers/AuthenticationController';

export default Router()
  .post('/signin', new AuthenticationController().post)
  .put('/signup', new AuthenticationController().put);
