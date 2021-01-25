/* eslint-disable @typescript-eslint/no-unused-vars */
import UserModel from '@modules/authentication/infra/postgres/models/User';

import IRepository from '@shared/core/IRepository';

export default class UserRepository
  implements IRepository<UserModel, number> {
  findAll(page?: number, size?: number): UserModel[] {
    throw new Error('Method not implemented.');
  }

  findOne(id: number): UserModel {
    throw new Error('Method not implemented.');
  }

  async saveOne(entity: UserModel): Promise<UserModel> {
    return new Promise((resolve, reject) => entity ? resolve(entity) : reject(entity));
  }

  saveAll(entities: UserModel[]): UserModel[] {
    throw new Error('Method not implemented.');
  }

  updateOne(id: number, entity: UserModel): UserModel {
    throw new Error('Method not implemented.');
  }

  updateAll(
    entities: { id: number; entity: UserModel }[],
  ): UserModel[] {
    throw new Error('Method not implemented.');
  }

  deleteOne(id: number): UserModel {
    throw new Error('Method not implemented.');
  }

  deleteAll(ids: number[]): UserModel[] {
    throw new Error('Method not implemented.');
  }
}
