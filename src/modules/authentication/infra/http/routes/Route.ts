import IRoute from '@shared/core/IRoute';
import { Router, IRouter } from 'express';

import AuthenticationController from '../controllers/AuthenticationController';

class Route implements IRoute<IRouter, AuthenticationController>{
  router: IRouter;
  controller = new AuthenticationController();

  constructor() {
    this.router = Router()
      .post('/signin', this.controller.post)
      .put('/signup', this.controller.put);
  }
}

export default new Route().router;
