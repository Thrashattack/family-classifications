import { Router } from 'express';

import classificationRoutes from '@modules/classification/infra/http/routes/classification';
// import contemplationRoutes from '@modules/contemplation/infra/http/routes/contemplation';

const v1Router = Router();

v1Router.use('/classification', classificationRoutes);

// TODO - Contemplation
// v1Router.use('/classification', contemplationRoutes);

export default v1Router;
