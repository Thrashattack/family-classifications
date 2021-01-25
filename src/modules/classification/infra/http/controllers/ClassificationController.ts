/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import ClassificationService from '@modules/classification/core/services/ClassificationService';
import IController from '@shared/core/IController';
import FamilyAdapter from '../adapters/FamilyAdapter';

export default class ClassificationController
  implements IController<Request, Response> {
  post = async (req: Request, res: Response): Promise<Response> => {
    try {
      const family = new FamilyAdapter().validate(req.body);

      const classificationResult = await new ClassificationService().execute(
        family,
      );

      return res.json(classificationResult);
    } catch (error) {
      return res.json({ error: (error as Error).message });
    }
  };
  put = (req: Request, res: Response): Promise<Response> => {
    throw new Error('Method not implemented.');
  };
  get = (req: Request, res: Response): Promise<Response> => {
    throw new Error('Method not implemented.');
  };
  patch = (req: Request, res: Response): Promise<Response> => {
    throw new Error('Method not implemented.');
  };
  delete = (req: Request, res: Response): Promise<Response> => {
    throw new Error('Method not implemented.');
  };
}
