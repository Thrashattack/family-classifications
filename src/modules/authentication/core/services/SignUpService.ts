import UserRepository from '@modules/authentication/infra/postgres/repositories/UserRepository';
import PasswordProvider from '@modules/authentication/core/providers/PasswordProvider';
import TokenProvider from '@modules/authentication/core/providers/TokenProvider';

import IProvider from '@shared/core/IProvider';
import IService from '@shared/core/IService';

import { Authentication, User } from '@common-types/Authentication';
import Logger from '@shared/singletons/Logger';

export default class SignUpService
  implements IService<User, Promise<Authentication>> {
  private UserRepository: UserRepository;
  private PasswordProvider: IProvider<string, string>;
  private TokenProvider: IProvider<User, Authentication>;

  constructor() {
    this.UserRepository = new UserRepository();
    this.PasswordProvider = new PasswordProvider();
    this.TokenProvider = new TokenProvider();
  }
  async execute(newUser: User): Promise<Authentication> {
    const user = await this.UserRepository.saveOne(newUser);

    if (!user) {
      Logger.emit('throw', 'Failed to create new user');
    }

    user.password = this.PasswordProvider.provide(newUser.password) as string;

    return this.TokenProvider.provide(user);
  }
}
