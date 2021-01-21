import { Router } from 'express';
import ensureAuthentication from '@shared/infra/http/middlewares/ensureAuthentication';
import ClassificationController from '../controllers/ClassificationController';
import IRoute from '@shared/core/IRoute';

class Route implements IRoute<Router, ClassificationController> {
  router = Router();
  controller = new ClassificationController();

 constructor(){
    this.router.use(ensureAuthentication);
    this.router.post('/classify', this.controller.post.bind(this.router));
  }
}

export default new Route().router;
