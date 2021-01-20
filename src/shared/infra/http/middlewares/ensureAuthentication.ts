import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

import authConfig from '@config/auth';

import TokenExpiredError from '@shared/errors/TokenExpiredError';
import { User } from '@shared/@types/types';

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void | Error {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error('Auth Token Is Missin.');
  }

  const [, token] = authHeader.split(' ');

  try {
    const user: User = jwt.verify(token, authConfig.secret) as User;
    req.app.set('username', user.login);
    return next();
  } catch {
    throw new TokenExpiredError('Invalid Auth Token');
  }
}
