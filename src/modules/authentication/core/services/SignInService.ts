import UserRepository from '@modules/authentication/core/repositories/UsersRepository';
import PasswordProvider from '@modules/authentication/core/providers/PasswordProvider';
import TokenProvider from '@modules/authentication/core/providers/TokenProvider';

import IService from '@shared/core/IService';
import IProvider from '@shared/core/IProvider';
import { Authentication, User } from '@common-types/Authentication';

export default class SignInService
  implements IService<User, Promise<Authentication>> {
  private UserRepository: UserRepository;
  private PasswordProvider: IProvider<string, string>;
  private TokenProvider: IProvider<User, Authentication>;
  constructor() {
    this.UserRepository = new UserRepository();
    this.PasswordProvider = new PasswordProvider();
    this.TokenProvider = new TokenProvider();
  }
  async execute(request: User): Promise<Authentication> {
    const { login, password } = request;

    const user: User = await this.UserRepository.findOne(login);

    const isPasswordCorrect =
      user.password === (this.PasswordProvider.provide(password) as string);

    if (!user || !isPasswordCorrect) {
      throw new Error('User or Password is Incorrect');
    }

    return this.TokenProvider.provide(user) as Authentication;
  }
}
