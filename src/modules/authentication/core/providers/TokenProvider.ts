import jwt from 'jsonwebtoken';

import { Authentication, User } from '@common-types/Authentication';
import IProvider from '@shared/core/IProvider';
import authConfig from '@config/auth';

export default class TokenProvider implements IProvider<User, Authentication> {
  provide(user: User): Authentication | Promise<Authentication> {
    const { secret, expiresIn } = authConfig;
    return {
      token: jwt.sign({ login: user.login }, secret, { expiresIn }),
      expires: new Date(
        new Date().setDate(new Date().getDate() + Number(expiresIn.charAt(0))),
      ),
    };
  }
}
