import { Router } from 'express';

import classificationRoutes from '@modules/classification/infra/http/routes/Route';
import contemplationRoutes from '@modules/contemplation/infra/http/routes/Route';
import authRoutes from '@modules/authentication/infra/http/routes/Route';

const v1Router = Router();

v1Router.use('/auth', authRoutes);

v1Router.use('/classification', classificationRoutes);

v1Router.use('/contemplation', contemplationRoutes);

export default v1Router;
