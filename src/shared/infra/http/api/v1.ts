import { Router } from 'express';

import classificationRoutes from '@modules/classification/infra/http/routes/Route';
import contemplationRoutes from '@modules/contemplation/infra/http/routes/Route';
import authRoutes from '@modules/authentication/infra/http/routes/Route';

const v1Router = Router();

v1Router.use(authRoutes);

v1Router.use(classificationRoutes);

v1Router.use(contemplationRoutes);

export default v1Router;
