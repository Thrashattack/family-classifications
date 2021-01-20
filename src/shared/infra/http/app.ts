import 'express-async-errors';

import 'dotenv/config';

import express from 'express';

import cors from 'cors';

import routes from './api/v1';

const app = express();

app.use(
  express.json({
    limit: '100MB',
  }),
  cors({
    exposedHeaders: ['X-USE-CACHE'],
  }),
  routes,
);
export default app;
