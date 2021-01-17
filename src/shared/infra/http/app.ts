import 'dotenv/config';

import 'express-async-errors';

import express from 'express';

import cors from 'cors';

import TokenExpiredError from '@shared/errors/TokenExpiredError';

import routes from './api/v1';

const app = express();

app.use(express.json());
app.use(
  cors({
    exposedHeaders: ['X-Total-Count', 'X-Total-Page'],
  }),
);
app.use(routes);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: express.NextFunction,
  ) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(err.stack);
    }

    if (err instanceof TokenExpiredError) {
      return res.status(401).json({
        code: 'token.expired',
        message: err.message,
      });
    }

    return res.status(500).json({ error: 'Internal server error' });
  },
);

export default app;
