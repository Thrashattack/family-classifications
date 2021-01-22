import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

import authConfig from '@config/auth';

import { User } from '@common-types/Authentication';

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): Record<symbol, string | symbol> | void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Auth Token is Missing' });
  }
  const [, token] = authHeader.split(' ');

  try {
    const user: User = jwt.verify(token, authConfig.secret) as User;
    req.app.set('username', user.login);
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid Auth Token' });
  }
}
