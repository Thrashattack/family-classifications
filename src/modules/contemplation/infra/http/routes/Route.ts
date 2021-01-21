import { Router } from 'express';

import ContemplationController from '@modules/contemplation/infra/http/controllers/ContemplationController';

import ensureAuthentication from '@shared/infra/http/middlewares/ensureAuthentication';
import IRoute from '@shared/core/IRoute';


class Route implements IRoute<Router, ContemplationController>{

  router = Router();
  controller = new ContemplationController();

  constructor() {
    this.router.use(ensureAuthentication)
    this.router.post('/contemplate', this.controller.post.bind(this.router));
  }
}

export default new Route().router;
