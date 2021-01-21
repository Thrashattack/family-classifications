import IRoute from '@shared/core/IRoute';
import { Router } from 'express';

import AuthenticationController from '../controllers/AuthenticationController';

class Route implements IRoute<Router, AuthenticationController>{
  router = Router();
  controller = new AuthenticationController();

  constructor() {
    this.router.post('/signin', this.controller.post.bind(this.router));
    this.router.put('/signup', this.controller.put.bind(this.router));
  }
}

export default new Route().router;
