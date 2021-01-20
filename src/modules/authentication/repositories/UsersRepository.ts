/* eslint-disable @typescript-eslint/no-unused-vars */
import IRepository from '@shared/core/IRepository';

import UserModel from '@modules/authentication/infra/postgres/models/User';

export default class UserRepository implements IRepository<UserModel, string> {
  findAll(_page?: number, _size?: number): Promise<UserModel>[] {
    throw new Error('Method not implemented.');
  }
  findOne(_id: string): Promise<UserModel> {
    if (_id === 'admin')
      return Promise.resolve({
        login: 'admin',
        password: '',
      } as UserModel);
    return Promise.reject({
      message: 'User not found',
    });
  }
  saveOne(_entity: UserModel): Promise<UserModel> {
    return Promise.resolve(_entity);
  }
  saveAll(_entities: UserModel[]): Promise<UserModel>[] {
    throw new Error('Method not implemented.');
  }
  updateOne(_id: string, _entity: UserModel): Promise<UserModel> {
    throw new Error('Method not implemented.');
  }
  updateAll(
    _entities: { id: string; entity: UserModel }[],
  ): Promise<UserModel>[] {
    throw new Error('Method not implemented.');
  }
  deleteOne(_id: string): Promise<UserModel> {
    throw new Error('Method not implemented.');
  }
  deleteAll(_ids: string[]): Promise<UserModel>[] {
    throw new Error('Method not implemented.');
  }
}
