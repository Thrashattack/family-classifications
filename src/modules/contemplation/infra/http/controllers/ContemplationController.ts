/* eslint-disable @typescript-eslint/no-unused-vars */
import { Classification } from '@common-types/Classification';
import ContemplationService from '@modules/contemplation/services/ContemplationService';
import IController from '@shared/core/IController';
import { Request, Response } from 'express';

export default class ContemplationController
  implements IController<Request, Response> {
  post = async (req: Request, res: Response): Promise<Response> => {
    try {
      const classified = req.body as Classification;

      const contemplationResult = await new ContemplationService().execute(
        classified,
      );

      return res.json(contemplationResult);
    } catch (error) {
      return res.json({ error: (error as Error).message });
    }
  };
  put(req: Request, res: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
  get(req: Request, res: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
  patch(req: Request, res: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
  delete(req: Request, res: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
}
