import { IRouter, Router } from 'express';
import ensureAuthentication from '@shared/infra/http/middlewares/ensureAuthentication';
import ClassificationController from '../controllers/ClassificationController';
import IRoute from '@shared/core/IRoute';

class Route implements IRoute<IRouter, ClassificationController> {
  router: IRouter;
  controller: ClassificationController;

 constructor(){
    this.router = Router()
      .use(ensureAuthentication)
      .post('/classify', this.controller.post);
  }
}

export default new Route().router;
