import express from 'express';

import SignInService from '@modules/authentication/services/SignInService';

import SignUpService from '@modules/authentication/services/SignUpService';

import { User, Authentication } from '@common-types/Basics';

const authenticationRouter = express.Router();

authenticationRouter.post(
  '/signin',
  async (req, res): Promise<void> => {
    try {
      const user: User = req.body as User;

      const signInResult: Authentication = await new SignInService().execute(
        user,
      );

      res.json(signInResult);
    } catch (error) {
      res.json({ error: (error as Error).message });
    }
  },
);

authenticationRouter.post(
  '/signup',
  async (req, res): Promise<void> => {
    try {
      const user: User = req.body as User;

      const signUpResult: Authentication = await new SignUpService().execute(
        user,
      );

      res.json(signUpResult);
    } catch (error) {
      res.json({ error: (error as Error).message });
    }
  },
);

export default authenticationRouter;
