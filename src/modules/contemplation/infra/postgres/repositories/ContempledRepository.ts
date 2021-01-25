/* eslint-disable @typescript-eslint/no-unused-vars */
import ContempledModel from '@modules/contemplation/infra/postgres/models/Contempled';

import IRepository from '@shared/core/IRepository';

export default class ContempledRepository
  implements IRepository<ContempledModel, number> {
  findAll(page?: number, size?: number): ContempledModel[] {
    throw new Error('Method not implemented.');
  }

  findOne(id: number): ContempledModel[] {
    throw new Error('Method not implemented.');
  }

  saveOne(entity: ContempledModel): ContempledModel {
    throw new Error('Method not implemented.');
  }

  saveAll(entities: ContempledModel[]): ContempledModel[] {
    throw new Error('Method not implemented.');
  }

  updateOne(id: number, entity: ContempledModel): ContempledModel {
    throw new Error('Method not implemented.');
  }

  updateAll(
    entities: { id: number; entity: ContempledModel }[],
  ): ContempledModel[] {
    throw new Error('Method not implemented.');
  }

  deleteOne(id: number): ContempledModel {
    throw new Error('Method not implemented.');
  }

  deleteAll(ids: number[]): ContempledModel[] {
    throw new Error('Method not implemented.');
  }
}
