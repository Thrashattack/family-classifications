import { IRouter, Router } from 'express';

import ContemplationController from '@modules/contemplation/infra/http/controllers/ContemplationController';

import ensureAuthentication from '@shared/infra/http/middlewares/ensureAuthentication';
import IRoute from '@shared/core/IRoute';


class Route implements IRoute<IRouter, ContemplationController>{

  router: IRouter;
  controller: ContemplationController;

  constructor() {
    this.router = Router()
      .use(ensureAuthentication)
      .post('/contemplate', this.controller.post);
  }
}

export default new Route().router;
