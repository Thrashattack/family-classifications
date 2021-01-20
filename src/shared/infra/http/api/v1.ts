import { Router } from 'express';

import classificationRoutes from '@modules/classification/infra/http/routes/classification';
import contemplationRoutes from '@modules/contemplation/infra/http/routes/contemplation';
import authRoutes from '@modules/authentication/infra/http/routes/authentication';

const v1Router = Router();

v1Router.use('/auth', authRoutes);

v1Router.use('/classification', classificationRoutes);

v1Router.use('/contemplation', contemplationRoutes);

export default v1Router;
