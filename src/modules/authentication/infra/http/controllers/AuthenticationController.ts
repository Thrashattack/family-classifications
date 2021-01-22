/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';

import SignInService from '@modules/authentication/core/services/SignInService';
import SignUpService from '@modules/authentication/core/services/SignUpService';

import IController from '@shared/core/IController';
import { Authentication, User } from '@common-types/Authentication';

export default class AuthenticationController
  implements IController<Request, Response> {
  post = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user = req.body as User;

      const signInResult: Authentication = await new SignInService().execute(
        user,
      );
      return res.json(signInResult);
    } catch (error) {
      return res.json({ error: (error as Error).message });
    }
  };
  put = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user: User = req.body as User;

      const signUpResult: Authentication = await new SignUpService().execute(
        user,
      );

      return res.json(signUpResult);
    } catch (error) {
      return res.json({ error: (error as Error).message });
    }
  };
  get(_req: Request, _res: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
  patch(_req: Request, _res: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
  delete(_req: Request, _res: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
}
