import jwt from 'jsonwebtoken';

import { Authentication, User } from '@common-types/Authentication';
import IProvider from '@shared/core/IProvider';
import authConfig from '@config/auth';

export default class TokenProvider implements IProvider<User, Authentication> {
  provide(user?: User): Authentication | Promise<Authentication> {
    return {
      token: jwt.sign(JSON.stringify(user), authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
      expires: new Date(
        new Date().setDate(
          new Date().getDate() + Number(authConfig.expiresIn.charAt(0)),
        ),
      ),
    };
  }
}
